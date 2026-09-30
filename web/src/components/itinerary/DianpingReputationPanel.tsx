'use client';

import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/common/Badge';

export const DianpingReputationPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-space-md">
      {/* Top Banner with Double Photos */}
      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-card-ambient border border-outline-variant/20 flex flex-col">
        <div className="grid grid-cols-2 gap-1 h-52 relative">
          <div className="h-full relative overflow-hidden group">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1EMByp2ZkuOY2JPXdmGFJSe36XYfPJCg4jCeL4ocUsNfKybqdgpcGdGs6mcIq5mvSl3tqiGCcGZaGpw6sPNXRJHGI4HDJQj2AptUMv1TyY4k4onceN-24yMcCgPeZ9XGgJW57krST5swWOtVcEFU09d-pWTK2NgZ4Hxg3Rhd3btvtnhvZWb1o7nN7JNMfp0IYJqYES3bxaH2w6hp-a63cXf_hbGIsthshcLbQY7mRqcYkep48pa31"
              alt="青年插画展 现场"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/80 via-transparent to-transparent flex items-end p-space-sm">
              <span className="font-label-sm text-label-sm text-white bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full">
                798 青年插画展 · 实拍
              </span>
            </div>
          </div>

          <div className="h-full relative overflow-hidden group">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq45KPH1_moLdHFBLz5ThpWqixCLCLrB2axOeyCdqU5M9PRHaxz72131-STY7hUUxqgwD82Huj31GCo4RK5CHfPqjMlH3ZmxsuVru_6sxjT60uxKFxFN9Hijo6eYuWuFtfikyW871hRXILE0Dnzn86X6dOQnYl8JVTWfNuQxvu59cx6nV3x-gzPW82I1ezM6kracxtiO09hRpcPTwjKNet_KoZbCA7ky7h_Bt6l1C1iA6cMvaAnAwP"
              alt="聚宝源鲜切羊肉"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/80 via-transparent to-transparent flex items-end p-space-sm">
              <span className="font-label-sm text-label-sm text-white bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full">
                聚宝源手工切肉 · 实拍
              </span>
            </div>
          </div>

          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-space-sm py-1 bg-surface-container-lowest/90 backdrop-blur-md rounded-full shadow-sm border border-outline-variant/20">
            <span
              className="material-symbols-outlined text-[16px] text-secondary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
            <span className="font-label-sm text-label-sm font-bold text-on-surface">
              大众点评 · 2026北京必玩榜 TOP 3
            </span>
          </div>
        </div>

        {/* Rating and Metadata */}
        <div className="p-space-md flex items-center justify-between border-t border-outline-variant/10">
          <div className="flex items-center gap-2">
            <span className="font-display-lg text-[28px] text-secondary leading-none font-black">
              4.8
            </span>
            <div className="flex flex-col">
              <div className="flex items-center text-primary-container">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
              </div>
              <span className="font-body-sm text-[11px] text-on-surface-variant">
                1.2万+ 条真实学生评价汇总
              </span>
            </div>
          </div>
          <span className="font-label-md text-label-md text-tertiary bg-tertiary-container/30 px-2.5 py-1 rounded-full font-bold">
            展期至 2026.05.20
          </span>
        </div>
      </div>

      {/* NLP Pitfall Tips Card */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-card-ambient border border-outline-variant/20 flex flex-col gap-space-sm">
        <div className="flex items-center justify-between pb-1 border-b border-outline-variant/10">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary-container text-[20px]">
              report_problem
            </span>
            <span className="font-headline-md text-headline-md text-on-surface font-bold">
              真实避坑建议
            </span>
          </div>
          <span className="font-label-sm text-[11px] text-outline font-medium">
            学生反馈 400+
          </span>
        </div>

        {/* Tip 1 */}
        <div className="p-space-sm bg-surface-container-low rounded-xl flex gap-space-sm items-start border border-outline-variant/10">
          <div className="w-6 h-6 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[15px]">lightbulb</span>
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-on-surface font-bold">
                光线与客流预警
              </span>
              <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant rounded text-[10px]">
                高频提及 418 次
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              “二层当代雕塑区<span className="text-secondary font-semibold">灯光昏暗</span>，拍照强烈建议自带补光灯，周末下午 <span className="text-secondary font-semibold">15:00 之后人流极其密集</span>，建议先看二层再逛一层。”
            </p>
          </div>
        </div>

        {/* Tip 2 */}
        <div className="p-space-sm bg-surface-container-low rounded-xl flex gap-space-sm items-start border border-outline-variant/10">
          <div className="w-6 h-6 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[15px]">savings</span>
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-on-surface font-bold">
                省钱锦囊
              </span>
              <span className="px-1.5 py-0.2 bg-surface-container text-on-surface-variant rounded text-[10px]">
                学生实测
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              “进馆千万<span className="text-secondary font-semibold">别花 20 元租导览器</span>！扫入口官方二维码直接听免费音频讲解；二层尽头有免费直饮水与手机充电桩。”
            </p>
          </div>
        </div>
      </div>

      {/* Transparent Student Cost Breakdown Card */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-card-ambient border border-outline-variant/20 flex flex-col gap-space-xs">
        <div className="flex items-center justify-between pb-1">
          <span className="font-headline-md text-headline-md text-on-surface font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-tertiary text-[18px]">calculate</span>
            费用明细 (4人同行AA)
          </span>
          <span className="font-label-sm text-tertiary font-bold">立省 60%</span>
        </div>
        <div className="text-body-sm text-on-surface-variant divide-y divide-outline-variant/10">
          <div className="py-1.5 flex justify-between">
            <span>门票 (学生特惠团)</span>
            <span className="font-semibold text-on-surface">¥20.0 /人 (原价¥40)</span>
          </div>
          <div className="py-1.5 flex justify-between">
            <span>餐饮 (必吃榜4人套餐)</span>
            <span className="font-semibold text-on-surface">¥39.5 /人 (原价¥78)</span>
          </div>
          <div className="py-1.5 flex justify-between">
            <span>接驳交通 (打车4人AA)</span>
            <span className="font-semibold text-on-surface">¥8.0 /人 (原价¥25)</span>
          </div>
          <div className="pt-2 flex justify-between items-baseline text-on-surface font-bold">
            <span>人均总预算支出</span>
            <div className="text-right">
              <span className="font-display-lg text-[22px] text-secondary font-black">¥67.5</span>
              <span className="text-[11px] text-outline ml-1 line-through">¥143.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
