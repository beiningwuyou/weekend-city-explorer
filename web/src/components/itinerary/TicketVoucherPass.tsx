'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/common/Badge';
import { Modal } from '@/components/common/Modal';

export const TicketVoucherPass: React.FC = () => {
  const [showQrModal, setShowQrModal] = useState(false);

  return (
    <>
      <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-card-ambient border border-outline-variant/20 flex flex-col gap-space-sm">
        <div className="flex items-center justify-between pb-1 border-b border-outline-variant/10">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary-container text-[22px]">
              confirmation_number
            </span>
            <span className="font-headline-md text-headline-md text-on-surface font-bold">
              美团门票 · 学信网特惠
            </span>
          </div>
          <Badge variant="xuexin" icon="school">
            学信网秒级免押
          </Badge>
        </div>

        <div className="p-space-sm bg-surface-container-low rounded-xl flex flex-col gap-1 border border-outline-variant/10">
          <div className="flex items-center justify-between">
            <span className="font-headline-md text-headline-md text-on-surface font-semibold">
              798插画艺术展 4 人学生特惠票包
            </span>
            <span className="font-label-sm text-tertiary font-bold">已减 ¥80</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            官方原价 ¥160 · 美团学信网认证立减 ¥80 · 实付仅 ¥80 (人均 ¥20)
          </p>
          <div className="mt-2 flex items-center justify-between pt-2 border-t border-outline-variant/10">
            <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface font-semibold">
              <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
              <span>免换票 · 闸机刷学信网动态二维码秒进</span>
            </div>
            <button
              onClick={() => setShowQrModal(true)}
              className="px-space-sm py-1 rounded-lg bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold shadow-xs hover:bg-primary-fixed-dim transition-all"
            >
              出示电子码
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      <Modal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        title="美团校园 · 798 艺术展入园凭证"
        description="本凭证已关联北京航空航天大学学生实名认证，4人同行直刷即可"
      >
        <div className="flex flex-col items-center justify-center p-4 gap-4">
          <div className="p-4 bg-white rounded-2xl shadow-md border-2 border-primary-container flex flex-col items-center gap-2">
            <div className="w-56 h-56 bg-slate-100 flex items-center justify-center rounded-xl overflow-hidden relative">
              {/* Simulated QR Code */}
              <div className="grid grid-cols-6 gap-2 p-4 w-full h-full bg-slate-900">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-xs ${
                      (i % 2 === 0 && i % 3 === 0) || i < 6 || i > 30 || i % 6 === 0
                        ? 'bg-white'
                        : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs shadow-md">
                  美团
                </span>
              </div>
            </div>
            <span className="font-mono text-body-md font-bold tracking-wider text-on-surface">
              MT-STU-798-883921
            </span>
          </div>
          <p className="text-body-sm text-on-surface-variant text-center">
            有效期：2026.10.18 当日有效 · 支持闸机 4 人连续刷码入馆
          </p>
        </div>
      </Modal>
    </>
  );
};
