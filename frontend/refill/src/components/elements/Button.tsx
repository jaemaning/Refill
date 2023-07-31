import { REFILL_COLORS } from '../../assets/getColors'
import { ButtonHTMLAttributes } from 'react';
import { CSSObject, jsx, css } from '@emotion/react'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  variant? : 'success' | 'warning' | 'disable' | 'danger' | 'normal'; // success : 긍정적 성공 파랑 , warning : 경고 노랑, disable : 사용할 수 없음 회색, dnager : 위험 빨강 
  size? : 'small' | 'medium' | 'large'; // 폰트 사이즈가 줄고 좌우 여백이 축소
  width? : string;
  customStyles? : CSSObject
  onClick?: () => void;
}

// content : 버튼 안에 들어갈 내용, size 크기정하기, width 넓이 직접설정 가능, customstyles : 위 적용후 후 커스텀스타일, onclick 이벤트연결
export default function Button ({content, variant = 'success', size, width = '100px', onClick, customStyles}: IButtonProps) {
  return jsx(
    'button',
    {
      onClick,
      css: css({
        outline: 'none',
        border: '1 solid transparent',
        borderRadius: '7px',
        cursor: 'pointer',
        transition: 'background .2s ease, color .1s ease',
        fontWeight: 600,
        lineHeight: '26px',
        fontSize: '15px',
        padding: '11px',
        boxShadow:' 4px 4px 5px rgba(0, 0, 0, 0.3)',
        width: size ? SIZE_VARIANTS[size] : width,
        ...TYPE_VARIANTS[variant],
        ...customStyles,
        ':active': {
          // boxShadow:'inset 4px 4px 5px rgba(0, 0, 0, 0.3)',
          boxShadow: 'none'
        } 
      })
    },
    content
  );
}


const TYPE_VARIANTS = {
  success: {
    backgroundColor : REFILL_COLORS['rf-1'],
    color : REFILL_COLORS['white'],
    ':hover': {
      backgroundColor: REFILL_COLORS['successChange'],
    },
  },
  normal: {
    backgroundColor : REFILL_COLORS['rf-4'],
    color : REFILL_COLORS['white'],
    ':hover': {
      backgroundColor: REFILL_COLORS['normalChange'],
    },
  },
  warning: {
    // define styles for warning variant
    backgroundColor : REFILL_COLORS['orange'],
    color : REFILL_COLORS['white'],
    ':hover': {
      backgroundColor: REFILL_COLORS['warningChange'],
    },
  },
  disable: {
    // define styles for disable variant
    backgroundColor : REFILL_COLORS['grey-1'],
    color : REFILL_COLORS['white'],
  },
  danger: {
    // define styles for danger variant
    backgroundColor : REFILL_COLORS['red'],
    color : REFILL_COLORS['white'],
    ':hover': {
      backgroundColor: REFILL_COLORS['dangerChange'],
    },
  },
}

const SIZE_VARIANTS = {
  small: '100px',
  medium: '150px',
  large: '200px',
};
