// @ts-nocheck
import { jsx as t, jsxs as o } from "react/jsx-runtime";
import { useState as e } from "react";
import { useNavigate as Le } from "react-router-dom";
import { ChevronRight as Q } from "lucide-react";
import { cn as Ge } from "../lib/utils";
import { motion as c, AnimatePresence as Ye } from "motion/react";
import { useAds as _e } from "../context/AdsContext";
import { useAuth as Ve } from "../context/AuthContext";
import { CarInputs as He } from "../components/createad/CarInputs";
import { RealEstateInputs as ze } from "../components/createad/RealEstateInputs";
import { ProjectInputs as De } from "../components/createad/ProjectInputs";
import { MediaSelector as Oe } from "../components/createad/MediaSelector";
import { SuccessReport as $e } from "../components/createad/SuccessReport";
import { StepCategorySelector as qe } from "../components/createad/StepCategorySelector";
import { StepLocation as Je } from "../components/createad/StepLocation";
import { StepPrice as Ke } from "../components/createad/StepPrice";
import { StepperHeader as Qe } from "../components/createad/StepperHeader";
import {
  steps as We,
  PRESET_CAR_IMAGES as h,
  PRESET_HOME_IMAGES as d,
} from "../components/createad/presetData";
function xt() {
  const W = Le(),
    { user: X } = Ve(),
    { addAd: Z, userLimits: ee, defaultLimits: j } = _e(),
    N = X?.phone || "",
    p = N ? ee[N] : null,
    te = p ? p.maxImages : j.maxImages,
    re = p ? p.maxVideos : j.maxVideos,
    [r, n] = e(1),
    [R, a] = e(null),
    [s, oe] = e("real-estate"),
    [i, ae] = e(""),
    [u, se] = e(""),
    [g, ie] = e(""),
    [A, ne] = e("\u062A\u0648\u064A\u0648\u062A\u0627"),
    [P, ce] = e("\u0643\u0627\u0645\u0631\u064A"),
    [F, le] = e("2024"),
    [M, de] = e("\u0623\u0648\u062A\u0648\u0645\u0627\u062A\u064A\u0643"),
    [T, pe] = e("\u0628\u0646\u0632\u064A\u0646"),
    [B, ue] = e("30000"),
    [U, me] = e("\u0633\u064A\u062F\u0627\u0646"),
    [E, ye] = e(
      "\u0645\u0633\u062A\u0639\u0645\u0644 \u0646\u0638\u064A\u0641",
    ),
    [I, ge] = e("\u0623\u0628\u064A\u0636"),
    [k, be] = e("\u0644\u0644\u0628\u064A\u0639"),
    [w, fe] = e("3 \u063A\u0631\u0641"),
    [L, Ce] = e("2 \u062D\u0645\u0627\u0645"),
    [G, xe] = e("150 \u0645\u062A\u0631 \u0645\u0631\u0628\u0639"),
    [Y, Se] = e("\u0644\u0644\u0628\u064A\u0639"),
    [_, ve] = e(
      "\u0627\u0644\u0637\u0627\u0628\u0642 \u0627\u0644\u0623\u0648\u0644",
    ),
    [V, he] = e("\u063A\u064A\u0631 \u0645\u0641\u0631\u0648\u0634"),
    [H, je] = e("\u062C\u062F\u064A\u062F / \u0635\u0641\u0631"),
    [z, Ne] = e(
      "\u062A\u062D\u062A \u0627\u0644\u0623\u0631\u0636 / \u062D\u0641\u0631 \u0648\u062A\u0623\u0633\u064A\u0633",
    ),
    [D, Re] = e("2026"),
    [b, Ae] = e(""),
    [O, Pe] = e("\u0639\u0644\u0649 \u0627\u0644\u0639\u0636\u0645"),
    [f, Fe] = e(""),
    [C, Me] = e(""),
    [x, Te] = e("\u062F\u0645\u0634\u0642"),
    [m, Be] = e(""),
    [mapUrlState, setMapUrlState] = e(""),
    [$, q] = e(d[0].url),
    [y, J] = e([d[0].url]),
    [K, Ue] = e([]),
    [l, Ee] = e(""),
    [S, Ie] = e("\u0644.\u0633"),
    [ownerPhone, setOwnerPhone] = e(N),
    [whatsappPhone, setWhatsappPhone] = e(""),
    ke = async () => {
      if ((a(null), r === 1)) {
        if (!i) {
          a(
            "\u0627\u0644\u0631\u062C\u0627\u0621 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0641\u0631\u0639\u064A \u0644\u0644\u0645\u062A\u0627\u0628\u0639\u0629",
          );
          return;
        }
        (q(s === "cars" ? h[0].url : d[0].url),
          J([s === "cars" ? h[0].url : d[0].url]),
          n(2));
        return;
      }
      if (r === 2) {
        if (!u.trim() || !g.trim()) {
          a(
            "\u0627\u0644\u0631\u062C\u0627\u0621 \u0645\u0644\u0621 \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0625\u0639\u0644\u0627\u0646 \u0648\u0648\u0635\u0641 \u0627\u0644\u0645\u0646\u062A\u062C \u0627\u0644\u0643\u0627\u0641\u064A \u0644\u0644\u0645\u0634\u062A\u0631\u064A\u0646",
          );
          return;
        }
        n(3);
        return;
      }
      if (r === 3) {
        if (!m.trim()) {
          a(
            "\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0627\u0633\u0645 \u0627\u0644\u062D\u064A \u0623\u0648 \u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0642\u0627\u0631/\u0627\u0644\u0645\u0631\u0643\u0628\u0629 \u0644\u0639\u0631\u0636\u0647 \u0644\u0644\u0632\u0628\u0627\u0626\u0646",
          );
          return;
        }
        n(4);
        return;
      }
      if (r === 4) {
        if (y.length === 0) {
          a(
            "\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0635\u0648\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0644\u0639\u0631\u0636 \u0627\u0644\u0633\u0644\u0639\u0629 \u0628\u0627\u0644\u0634\u0643\u0644 \u0627\u0644\u0623\u0645\u062B\u0644",
          );
          return;
        }
        n(5);
        return;
      }
      if (r === 5) {
        if (!l || l <= 0) {
          a(
            "\u0627\u0644\u0631\u062C\u0627\u0621 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u0628\u062F\u0642\u0629 \u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0646\u0634\u0631 \u0627\u0644\u0625\u0639\u0644\u0627\u0646",
          );
          return;
        }
        try {
          await Z({
            title: u,
            description: g,
            price: Number(l),
            currency:
              S === "\u062F\u0648\u0644\u0627\u0631"
                ? "\u062F\u0648\u0644\u0627\u0631"
                : "\u0644.\u0633",
            location: `${x}\u060C ${m}`,
            category: s,
            subCategory: i,
            image: $ || y[0] || "",
            mapUrl: mapUrlState || "",
            ownerPhone,
            whatsappPhone,
            images: y,
            videoUrls: K.length > 0 ? K : void 0,
            specs:
              s === "cars"
                ? {
                    brand: A,
                    model: P,
                    year: Number(F) || 2024,
                    gear: M,
                    fuel: T,
                    carMileage: Number(B) || 0,
                    carBodyType: U,
                    carCondition: E,
                    carType: k,
                    carColor: I,
                  }
                : i ===
                    "\u0645\u0634\u0627\u0631\u064A\u0639 \u0639\u0642\u0627\u0631\u064A\u0629 \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"
                  ? {
                      propType: "\u0645\u0634\u0631\u0648\u0639",
                      projectStatus: z,
                      deliveryYear: D,
                      projectFloors: b !== "" ? Number(b) : void 0,
                      projectFinishing: O,
                      projectLandArea: f !== "" ? Number(f) : void 0,
                      projectUnitsCount: C !== "" ? Number(C) : void 0,
                    }
                  : {
                      propType:
                        i ===
                        "\u0641\u0644\u0644 \u0648\u0645\u0632\u0627\u0631\u0639 \u0646\u0632\u0647\u0629"
                          ? "\u0641\u064A\u0644\u0627"
                          : i ===
                              "\u0623\u0631\u0627\u0636\u064A \u0644\u0644\u0628\u064A\u0639"
                            ? "\u0623\u0631\u0636"
                            : "\u0634\u0642\u0629",
                      reRooms: w,
                      reBaths: L,
                      reArea: G,
                      reFloor: _,
                      reFurnished: V,
                      reBuildingAge: H,
                      reType: Y,
                    },
          });
          n(6);
        } catch (e) {
          a(
            "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u0644\u0627\u0646، \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649",
          );
        }
      }
    },
    we = () => {
      (a(null), r > 1 && n(r - 1));
    };
  return o("div", {
    className: "min-h-screen bg-gray-50 flex flex-col font-sans select-none",
    dir: "rtl",
    children: [
      t(Qe, { currentStep: r, steps: We }),
      o("div", {
        className:
          "flex-1 w-full max-w-3xl mx-auto p-4 sm:p-6 space-y-6 pb-24 text-right",
        children: [
          R &&
            o("div", {
              className:
                "bg-[#C9A15A]/10 text-[#0D3B46] border-r-4 border-[#C9A15A] p-4 rounded-xl flex items-center gap-2 justify-between animate-pulse",
              children: [
                t("span", { className: "text-xs font-bold", children: R }),
                t("button", {
                  onClick: () => a(null),
                  className: "text-xs font-black",
                  children: "\u2715",
                }),
              ],
            }),
          o(Ye, {
            mode: "wait",
            children: [
              r === 1 &&
                t(
                  c.div,
                  {
                    initial: { opacity: 0, scale: 0.98 },
                    animate: { opacity: 1, scale: 1 },
                    exit: { opacity: 0, scale: 0.98 },
                    children: t(qe, {
                      category: s,
                      setCategory: oe,
                      subCategory: i,
                      setSubCategory: ae,
                    }),
                  },
                  "step1",
                ),
              r === 2 &&
                o(
                  c.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    className: "space-y-4",
                    children: [
                      o("div", {
                        className:
                          "bg-white p-5 rounded-3xl border border-gray-150 space-y-4",
                        children: [
                          o("div", {
                            className: "space-y-1",
                            children: [
                              t("label", {
                                className: "text-xs font-bold text-gray-750",
                                children:
                                  "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0625\u0639\u0644\u0627\u0646 \u0627\u0644\u0623\u0633\u0627\u0633\u064A *",
                              }),
                              t("input", {
                                type: "text",
                                value: u,
                                onChange: (v) => se(v.target.value),
                                placeholder:
                                  "\u0645\u062B\u0627\u0644: \u0634\u0642\u0629 \u0633\u0648\u0628\u0631 \u062F\u064A\u0644\u0648\u0643\u0633 \u0645\u0641\u0631\u0648\u0634\u0629 \u0641\u064A \u0645\u0634\u0631\u0648\u0639 \u062F\u0645\u0631",
                                className:
                                  "w-full h-11 px-3 border border-gray-200 bg-slate-50 focus:bg-white rounded-xl text-xs font-bold outline-none",
                              }),
                            ],
                          }),
                          o("div", {
                            className: "space-y-1",
                            children: [
                              t("label", {
                                className: "text-xs font-bold text-gray-750",
                                children:
                                  "\u0648\u0635\u0641 \u0627\u0644\u0633\u0644\u0639\u0629 \u0648\u062A\u0641\u0627\u0635\u064A\u0644 \u0643\u0634\u0641 \u0627\u0644\u062D\u0627\u0644\u0629 *",
                              }),
                              t("textarea", {
                                value: g,
                                onChange: (v) => ie(v.target.value),
                                placeholder:
                                  "\u0627\u0643\u062A\u0628 \u0623\u062F\u0642 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0634\u0642\u0629 \u0623\u0648 \u0627\u0644\u0633\u064A\u0627\u0631\u0629 \u0648\u0639\u0645\u0631 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0644\u0646\u064A\u0644 \u062B\u0642\u0629 \u0627\u0644\u0645\u0634\u062A\u0631\u064A \u0627\u0644\u0641\u0648\u0631\u064A\u0629...",
                                className:
                                  "w-full h-24 p-3 border border-gray-200 bg-slate-50 focus:bg-white rounded-xl text-xs font-bold outline-none resize-none",
                              }),
                            ],
                          }),
                        ],
                      }),
                      t("div", {
                        className:
                          "bg-white p-5 rounded-3xl border border-gray-150",
                        children:
                          s === "cars"
                            ? t(He, {
                                carBrand: A,
                                setCarBrand: ne,
                                carModel: P,
                                setCarModel: ce,
                                carYear: F,
                                setCarYear: le,
                                carGear: M,
                                setCarGear: de,
                                carFuel: T,
                                setCarFuel: pe,
                                carMileage: B,
                                setCarMileage: ue,
                                carBodyType: U,
                                setCarBodyType: me,
                                carCondition: E,
                                setCarCondition: ye,
                                carColor: I,
                                setCarColor: ge,
                                carType: k,
                                setCarType: be,
                              })
                            : i ===
                                "\u0645\u0634\u0627\u0631\u064A\u0639 \u0639\u0642\u0627\u0631\u064A\u0629 \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630"
                              ? t(De, {
                                  projectStatusState: z,
                                  setProjectStatusState: Ne,
                                  deliveryYearState: D,
                                  setDeliveryYearState: Re,
                                  projectFloorsState: b,
                                  setProjectFloorsState: Ae,
                                  projectTypeState: "\u0633\u0643\u0646\u064A",
                                  setProjectTypeState: () => {},
                                  projectFinishingState: O,
                                  setProjectFinishingState: Pe,
                                  projectLandAreaState: f,
                                  setProjectLandAreaState: Fe,
                                  projectUnitsCountState: C,
                                  setProjectUnitsCountState: Me,
                                })
                              : t(ze, {
                                  reRooms: w,
                                  setReRooms: fe,
                                  reBaths: L,
                                  setReBaths: Ce,
                                  reArea: G,
                                  setReArea: xe,
                                  reType: Y,
                                  setReType: Se,
                                  reFloor: _,
                                  setReFloor: ve,
                                  reFurnished: V,
                                  setReFurnished: he,
                                  reBuildingAge: H,
                                  setReBuildingAge: je,
                                }),
                      }),
                    ],
                  },
                  "step2",
                ),
              r === 3 &&
                t(
                  c.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    children: t(Je, {
                      selectedCity: x,
                      setSelectedCity: Te,
                      neighborhood: m,
                      setNeighborhood: Be,
                      mapUrl: mapUrlState,
                      setMapUrl: setMapUrlState,
                    }),
                  },
                  "step3",
                ),
              r === 4 &&
                t(
                  c.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    children: t("div", {
                      className:
                        "bg-white p-5 rounded-3xl border border-gray-150",
                      children: t(Oe, {
                        category: s,
                        imageUrl: $,
                        setImageUrl: q,
                        imageUrls: y,
                        setImageUrls: J,
                        videoUrls: K,
                        setVideoUrls: Ue,
                        currentMaxImages: te,
                        currentMaxVideos: re,
                        PRESET_CAR_IMAGES: h,
                        PRESET_HOME_IMAGES: d,
                      }),
                    }),
                  },
                  "step4",
                ),
              r === 5 &&
                t(
                  c.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    children: t(Ke, {
                      currency: S,
                      setCurrency: Ie,
                      price: l,
                      setPrice: Ee,
                      ownerPhone,
                      setOwnerPhone,
                      whatsappPhone,
                      setWhatsappPhone,
                    }),
                  },
                  "step5",
                ),
              r === 6 &&
                t(
                  c.div,
                  {
                    initial: { opacity: 0, scale: 0.95 },
                    animate: { opacity: 1, scale: 1 },
                    children: t($e, {
                      price: l,
                      currency: S,
                      title: u,
                      selectedCity: x,
                      neighborhood: m,
                      onGoHome: () => W("/"),
                    }),
                  },
                  "step6",
                ),
            ],
          }),
          r <= 5 &&
            o("div", {
              className: "flex justify-between items-center sm:px-2 pt-4",
              children: [
                o("button", {
                  type: "button",
                  onClick: we,
                  className: Ge(
                    "px-5 py-2.5 rounded-xl border border-gray-250 bg-white hover:bg-gray-100 text-xs font-black transition-all cursor-pointer flex items-center gap-1",
                    r === 1 && "opacity-0 pointer-events-none",
                  ),
                  children: [
                    t(Q, { size: 13, className: "rtl:rotate-180" }),
                    "\u0627\u0644\u0633\u0627\u0628\u0642",
                  ],
                }),
                o("button", {
                  type: "button",
                  onClick: ke,
                  className:
                    "px-6 py-2.5 rounded-xl bg-[#0D3B46] text-[#fff] hover:bg-[#122538] text-xs font-black transition-all cursor-pointer flex items-center gap-1.5",
                  children: [
                    t(Q, { size: 13 }),
                    t("span", {
                      children:
                        r === 5
                          ? "\u0625\u062A\u0645\u0627\u0645 \u0648\u0646\u0634\u0631 \u0627\u0644\u0625\u0639\u0644\u0627\u0646"
                          : "\u0627\u0644\u0645\u062A\u0627\u0628\u0639 \u0627\u0644\u062A\u0627\u0644\u064A",
                    }),
                  ],
                }),
              ],
            }),
        ],
      }),
    ],
  });
}
export { xt as CreateAdPage };
