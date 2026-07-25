import paramiko
import sys
import os

if len(sys.argv) < 2:
    print("Usage: python remote_exec.py <command>")
    sys.exit(1)

command = " ".join(sys.argv[1:])

host = "91.144.19.103"
port = 2222
user = "his"
password = "C@@2026@@c"

try:
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(hostname=host, port=port, username=user, password=password)
    
    stdin, stdout, stderr = client.exec_command(command)
    
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    
    if out:
        print(out, end="")
    if err:
        print(err, end="", file=sys.stderr)
        
    exit_status = stdout.channel.recv_exit_status()
    client.close()
    sys.exit(exit_status)
except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)
