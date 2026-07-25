import React, { useEffect, useRef, useState, useCallback } from 'react';

interface SyrianIdData {
  nationalId?: string;
  fullName?: string;
  fatherName?: string;
  motherName?: string;
  gender?: 'MALE' | 'FEMALE';
  dateOfBirth?: string;
  address?: string;
  addressCity?: string;
  addressDistrict?: string;
  addressDetails?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}

export function LiveIdScannerModal({
  open,
  onOpenChange,
  onScan,
  username,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScan: (data: SyrianIdData, rawText: string) => void;
  username: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [mode, setMode] = useState<'init' | 'camera' | 'fallback'>('init');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);
  const [streamReady, setStreamReady] = useState<MediaStream | null>(null);

  // Step 1: Try to get camera stream
  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    setMode('init');
    setError('');
    setPreview('');
    setCapturedBlob(null);
    setStreamReady(null);

    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        setStreamReady(stream);
        setMode('camera');
      } catch {
        if (!cancelled) setMode('fallback');
      }
    })();

    return () => {
      cancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [open]);

  // Step 2: Once mode is 'camera' AND video ref is available, attach stream
  useEffect(() => {
    if (mode === 'camera' && streamReady && videoRef.current) {
      videoRef.current.srcObject = streamReady;
      videoRef.current.play().catch(() => {});
    }
  }, [mode, streamReady]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setStreamReady(null);
  }, []);

  const handleClose = useCallback(() => {
    stopCamera();
    onOpenChange(false);
  }, [stopCamera, onOpenChange]);

  // Capture frame from live video
  const captureFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (blob) {
          setCapturedBlob(blob);
          setPreview(URL.createObjectURL(blob));
          stopCamera();
        }
      },
      'image/jpeg',
      0.92,
    );
  }, [stopCamera]);

  // Send image to OCR
  const sendToOcr = useCallback(
    async (blob: Blob) => {
      setProcessing(true);
      setError('');
      try {
        const formData = new FormData();
        formData.append('file', new File([blob], 'id-scan.jpg', { type: 'image/jpeg' }));
        const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
        const hdrs: Record<string, string> = { 'x-mock-username': username };
        if (token) hdrs['Authorization'] = 'Bearer ' + token;
        const res = await fetch('/api/services/ocr/scan', {
          method: 'POST',
          headers: hdrs,
          body: formData,
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const json = await res.json();
        const d = json.data !== undefined ? json.data : json;
        if (d && (d.fullName || d.nationalId || d.fatherName)) {
          onScan(d, JSON.stringify(d));
          handleClose();
        } else {
          setError('\u0644\u0645 \u064a\u062a\u0645 \u0627\u0644\u062a\u0639\u0631\u0641 \u0639\u0644\u0649 \u0628\u064a\u0627\u0646\u0627\u062a. \u062d\u0627\u0648\u0644 \u062a\u0635\u0648\u064a\u0631 \u0627\u0644\u0647\u0648\u064a\u0629 \u0628\u0648\u0636\u0648\u062d \u0623\u0643\u062b\u0631.');
          setCapturedBlob(null);
          setPreview('');
        }
      } catch {
        setError('\u062d\u062f\u062b \u062e\u0637\u0623. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.');
      } finally {
        setProcessing(false);
      }
    },
    [username, onScan, handleClose],
  );

  // Handle file from fallback input
  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setCapturedBlob(file);
      setPreview(URL.createObjectURL(file));
    },
    [],
  );

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget && !processing) handleClose(); }}
    >
      <div
        style={{
          background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: '20px', padding: '24px', maxWidth: '520px', width: '94%',
          boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>{'\uD83C\uDDF8\uD83C\uDDFE'}</div>
          <h2 style={{ color: '#f1f5f9', fontSize: '20px', fontWeight: 800, margin: '0 0 4px' }}>
            {'\u0645\u0633\u062D \u0627\u0644\u0647\u0648\u064A\u0629 \u0627\u0644\u0633\u0648\u0631\u064A\u0629'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>
            {mode === 'camera'
              ? '\u0648\u062C\u0651\u0647 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627 \u0646\u062D\u0648 \u0627\u0644\u0647\u0648\u064A\u0629 \u062B\u0645 \u0627\u0636\u063A\u0637 \u0627\u0644\u062A\u0642\u0627\u0637'
              : '\u0627\u0631\u0641\u0639 \u0635\u0648\u0631\u0629 \u0648\u0627\u0636\u062D\u0629 \u0644\u0644\u0647\u0648\u064A\u0629 \u0627\u0644\u0633\u0648\u0631\u064A\u0629'}
          </p>
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handleFile} style={{ display: 'none' }} />
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Loading */}
        {mode === 'init' && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid rgba(34,197,94,0.3)', borderTopColor: '#22c55e', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
            <div style={{ fontSize: '14px' }}>{'\u062C\u0627\u0631\u064A \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627...'}</div>
          </div>
        )}

        {/* Camera Mode - video is ALWAYS rendered when mode is camera */}
        {mode === 'camera' && !preview && (
          <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: '#000', borderRadius: '14px', overflow: 'hidden', marginBottom: '16px' }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: '10%', border: '3px dashed rgba(34,197,94,0.5)', borderRadius: '14px', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(0,0,0,0.5)', color: '#22c55e', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, pointerEvents: 'none' }}>
              {'\u0636\u0639 \u0627\u0644\u0647\u0648\u064A\u0629 \u062F\u0627\u062E\u0644 \u0627\u0644\u0625\u0637\u0627\u0631'}
            </div>
          </div>
        )}

        {/* Fallback Mode */}
        {mode === 'fallback' && !preview && (
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '100%', aspectRatio: '4/3', borderRadius: '14px', marginBottom: '16px',
              border: '3px dashed rgba(100,116,139,0.4)', background: 'rgba(255,255,255,0.03)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', gap: '12px',
            }}
          >
            <div style={{ fontSize: '48px', opacity: 0.6 }}>{'\uD83D\uDCF7'}</div>
            <div style={{ color: '#94a3b8', fontSize: '15px', fontWeight: 600 }}>
              {'\u0627\u0636\u063A\u0637 \u0647\u0646\u0627 \u0644\u0627\u0644\u062A\u0642\u0627\u0637 \u0635\u0648\u0631\u0629 \u0623\u0648 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641'}
            </div>
            <div style={{ color: '#475569', fontSize: '12px' }}>
              {'\u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u0639\u0628\u0631 HTTP \u2013 \u0627\u0633\u062A\u062E\u062F\u0645 HTTPS \u0644\u0644\u0645\u0633\u062D \u0627\u0644\u0645\u0628\u0627\u0634\u0631'}
            </div>
          </div>
        )}

        {/* Preview */}
        {preview && (
          <div style={{ width: '100%', borderRadius: '14px', overflow: 'hidden', marginBottom: '16px', border: '2px solid rgba(34,197,94,0.4)' }}>
            <img src={preview} alt="" style={{ width: '100%', display: 'block' }} />
          </div>
        )}

        {/* Processing */}
        {processing && (
          <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(34,197,94,0.08)', borderRadius: '12px', marginBottom: '12px', border: '1px solid rgba(34,197,94,0.15)' }}>
            <div style={{ width: '36px', height: '36px', border: '3px solid rgba(34,197,94,0.3)', borderTopColor: '#22c55e', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 10px' }} />
            <p style={{ color: '#22c55e', fontSize: '14px', fontWeight: 700, margin: 0 }}>
              {'\u062C\u0627\u0631\u064A \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0647\u0648\u064A\u0629...'}
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(239,68,68,0.08)', borderRadius: '12px', marginBottom: '12px', border: '1px solid rgba(239,68,68,0.15)' }}>
            <p style={{ color: '#ef4444', fontSize: '13px', fontWeight: 600, margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {mode === 'camera' && !preview && !processing && (
            <button onClick={captureFrame} style={{
              flex: 1, background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff',
              border: 'none', padding: '14px 20px', borderRadius: '12px', cursor: 'pointer',
              fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px',
            }}>
              {'\uD83D\uDCF8'} {'\u0627\u0644\u062A\u0642\u0627\u0637'}
            </button>
          )}
          {preview && !processing && (
            <>
              <button onClick={() => capturedBlob && sendToOcr(capturedBlob)} style={{
                flex: 1, background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff',
                border: 'none', padding: '14px 20px', borderRadius: '12px', cursor: 'pointer',
                fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '8px',
              }}>
                {'\u2705'} {'\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0647\u0648\u064A\u0629'}
              </button>
              <button onClick={() => { setPreview(''); setCapturedBlob(null); setError(''); if (mode === 'fallback') fileInputRef.current?.click(); }} style={{
                background: 'rgba(255,255,255,0.06)', color: '#94a3b8',
                border: '1px solid rgba(255,255,255,0.1)', padding: '14px 16px',
                borderRadius: '12px', cursor: 'pointer', fontSize: '14px', fontWeight: 700,
              }}>
                {'\uD83D\uDD04'}
              </button>
            </>
          )}
          {mode === 'fallback' && !preview && !processing && (
            <button onClick={() => fileInputRef.current?.click()} style={{
              flex: 1, background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff',
              border: 'none', padding: '14px 20px', borderRadius: '12px', cursor: 'pointer',
              fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px',
            }}>
              {'\uD83D\uDCF7'} {'\u0627\u062E\u062A\u064A\u0627\u0631 \u0635\u0648\u0631\u0629'}
            </button>
          )}
          <button onClick={handleClose} disabled={processing} style={{
            background: 'rgba(255,255,255,0.06)', color: '#94a3b8',
            border: '1px solid rgba(255,255,255,0.1)', padding: '14px 20px',
            borderRadius: '12px', cursor: processing ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: 700,
          }}>
            {'\u0625\u0644\u063A\u0627\u0621'}
          </button>
        </div>

        <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      </div>
    </div>
  );
}
