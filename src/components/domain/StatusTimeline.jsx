import { C } from '../../constants/theme';
import { STATUS_STEPS, STATUS_ICONS } from '../../constants/data';

export default function StatusTimeline({ status, t, isRTL }) {
  const idx = STATUS_STEPS.indexOf(status);
  const labels = [t.step1, t.step2, t.step3, t.step4];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'relative',
        padding: '8px 0'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 18,
          [isRTL ? 'right' : 'left']: `calc(12.5%)`,
          width: '75%',
          height: 3,
          background: `linear-gradient(${isRTL ? 'to left' : 'to right'},${C.green} ${(idx / 3) * 100}%,${C.border} ${(idx / 3) * 100}%)`,
          transition: 'all .5s ease'
        }}
      />
      {STATUS_STEPS.map((s, i) => {
        const done = i <= idx;
        const active = i === idx;
        return (
          <div
            key={s}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              position: 'relative',
              zIndex: 1
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: `3px solid ${done ? C.green : C.border}`,
                background: done ? C.green : C.card,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                transition: 'all .3s',
                boxShadow: active ? '0 0 0 4px rgba(39,174,96,.25)' : undefined
              }}
            >
              {STATUS_ICONS[i]}
            </div>
            <div
              style={{
                fontSize: 11,
                marginTop: 6,
                fontWeight: done ? 700 : 400,
                color: done ? C.green : C.muted,
                textAlign: 'center',
                maxWidth: 70
              }}
            >
              {labels[i]}
            </div>
          </div>
        );
      })}
    </div>
  );
}
