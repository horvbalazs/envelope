import { animated, useSpring } from '@react-spring/web';
import { Box, Typography, useTheme } from '@mui/material';
import { useCallback, useState } from 'react';
import { LETTER_DELAY, OPEN_DELAY, TURN_SPEED } from '../utils/constants';

interface IOwnProps {
  title: string;
  message: string;
  onOpen: () => void;
}

export default function Envelope({ title, message, onOpen }: IOwnProps) {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const containerRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      const resizeObserver = new ResizeObserver(([resizedNode]) => {
        setWidth(resizedNode.contentRect.width);
        setHeight(resizedNode.contentRect.height);
      });
      resizeObserver.observe(node);
    }
  }, []);

  const theme = useTheme();
  const [flapSprings, flapApi] = useSpring(() => ({
    from: {
      transform: 'rotateX(0deg)',
      zIndex: 3,
    },
  }));
  const [letterSprings, letterApi] = useSpring(
    () => ({
      from: {
        transform: 'rotate(0deg)',
        top: '4px',
      },
    }),
    [height]
  );
  const [rotateSprings, rotateApi] = useSpring(() => ({
    from: {
      transform: 'rotate3d(0, 1, 0, 180deg)',
    },
    config: {
      duration: TURN_SPEED,
    },
  }));
  const [envelopeSprings, envelopeApi] = useSpring(
    () => ({
      from: {
        marginTop: '0px',
      },
    }),
    [height]
  );

  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    rotateApi.start({
      to: {
        transform: 'rotate3d(0, 1, 0, 0deg)',
      },
    });

    setTimeout(() => {
      setOpened(true);

      setTimeout(() => {
        flapApi.start({
          to: {
            transform: 'rotateX(180deg)',
            zIndex: 1,
          },
        });

        setTimeout(() => {
          letterApi.start({
            to: {
              transform: 'rotate(1deg)',
              top: `-${height - 10}px`,
            },
          });
          envelopeApi.start({
            to: {
              marginTop: `${height}px`,
            },
          });
        }, LETTER_DELAY);
      }, OPEN_DELAY);
    }, TURN_SPEED / 2);

    onOpen();
  };

  return (
    <Box
      className={opened ? 'opened' : ''}
      component={animated.div}
      onClick={() => handleOpen()}
      ref={containerRef}
      sx={{
        position: 'relative',
        backgroundColor: theme.palette.envelope.frontFlap,
        maxWidth: theme.spacing(80),
        width: '50%',
        maxHeight: '50%',
        aspectRatio: '1.6 / 1',
        borderRadius: theme.spacing(1),
        boxShadow: `1px 1px 4px 4px ${theme.palette.divider}`,
        '&:hover:not(.opened)': {
          cursor: 'pointer',
          boxShadow: `1px 1px 6px 6px ${theme.palette.divider}`,
        },
      }}
      style={{
        marginTop: envelopeSprings.marginTop,
        transform: rotateSprings.transform,
      }}
    >
      <Box
        component={animated.div}
        sx={{
          position: 'absolute',
          top: '1px',
          borderLeft: `${width / 2}px solid transparent`,
          borderRight: `${width / 2}px solid transparent`,
          borderBottom: `${height / 2 - 8}px solid transparent`,
          borderTop: `${height / 2 + 16}px solid ${
            theme.palette.envelope.frontFlap
          }`,
          transformOrigin: 'top',
          zIndex: 3,
        }}
        style={flapSprings}
      />
      {!opened && (
        <Box
          sx={{
            position: 'absolute',
            height: `${height}px`,
            width: `${width}px`,
            zIndex: 4,
            transform: 'rotate3d(0, 1, 0, 180deg)',
            backgroundColor: theme.palette.envelope.bottomFlap,
            textAlign: 'center',
            alignContent: 'center',
            overflow: 'hidden',
            borderBottomLeftRadius: theme.spacing(1),
            borderBottomRightRadius: theme.spacing(1),
          }}
        >
          <Typography sx={{ fontSize: '1.5vw', wordWrap: 'break-word' }}>
            {title}
          </Typography>
        </Box>
      )}
      <Box
        component={animated.div}
        style={{
          position: 'absolute',
          width: `calc(100% - ${theme.spacing(6)})`,
          height: `calc(100% - ${theme.spacing(4)})`,
          backgroundColor: theme.palette.background.paper,
          left: theme.spacing(3),
          padding: theme.spacing(1),
          boxShadow: `1px 1px 4px 4px ${theme.palette.divider}`,
          zIndex: 2,
          overflow: 'hidden',
          textAlign: 'center',
          alignContent: 'center',
          ...letterSprings,
        }}
      >
        <Typography sx={{ fontSize: '1vw', wordWrap: 'break-word' }}>
          {message}
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          borderLeft: `${width / 2}px solid ${theme.palette.envelope.sideFlap}`,
          borderRight: `${width / 2}px solid ${
            theme.palette.envelope.sideFlap
          }`,
          borderBottom: `${height / 2 - 8}px solid ${
            theme.palette.envelope.bottomFlap
          }`,
          borderTop: `${height / 2 + 8}px solid transparent`,
          transformOrigin: 'top',
          borderBottomLeftRadius: theme.spacing(1),
          borderBottomRightRadius: theme.spacing(1),
        }}
      />
    </Box>
  );
}
