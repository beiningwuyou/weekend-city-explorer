import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'must-eat' // 大众点评必吃榜 / 必玩榜 (Flame orange)
    | 'xuexin' // 学信网高校实名认证 (Sky blue)
    | 'eco' // 绿色出行 / 拼单成功 (Mint green)
    | 'warning' // 避坑预警 (Amber)
    | 'neutral' // 灰色普通标签
    | 'primary'; // 美团黄色高亮
  icon?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  icon,
  children,
  ...props
}) => {
  const variantStyles = {
    'must-eat':
      'bg-[#FFF7ED] text-[#FF6600] border border-[rgba(255,102,0,0.25)] font-semibold shadow-xs',
    xuexin:
      'bg-[#EFF6FF] text-[#2563EB] border border-[rgba(37,99,235,0.2)] font-medium',
    eco: 'bg-[#ECFDF5] text-[#059669] border border-[rgba(5,150,105,0.2)] font-semibold',
    warning:
      'bg-[#FFFBEB] text-[#D97706] border border-[rgba(217,119,6,0.25)] font-medium',
    neutral:
      'bg-surface-container text-on-surface-variant font-medium',
    primary:
      'bg-primary-container/30 text-on-primary-container border border-primary-container font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label-sm tracking-tight select-none',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {icon && (
        <span className="material-symbols-outlined text-[13px] leading-none shrink-0">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};
