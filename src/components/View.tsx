import { Box, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { decryptMessage } from '../utils/helpers';
import Envelope from './Envelope';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function View() {
  const theme = useTheme();
  const [params] = useSearchParams();
  const title = params.get('title');
  const encryptedMessage = params.get('message');
  const [fullScreen, setFullScreen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const message = useMemo(
    () => (encryptedMessage ? decryptMessage(encryptedMessage) : undefined),
    [encryptedMessage]
  );

  if (!title || !message) {
    return <Navigate to="/message-error" />;
  }

  return (
    <Box
      sx={{
        position: fullScreen ? 'fixed' : 'unset',
        height: fullScreen ? '100vh' : '100%',
        width: fullScreen ? '100vw' : '100%',
        top: 0,
        left: 0,
        backgroundColor: theme.palette.background.default,
        zIndex: fullScreen ? theme.zIndex.tooltip : 0,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
      }}
    >
      {fullScreen && (
        <Tooltip title="Exit fullscreen" placement="left">
          <IconButton
            onClick={() => setFullScreen(false)}
            sx={{
              position: 'fixed',
              top: theme.spacing(2),
              right: theme.spacing(2),
            }}
          >
            <CancelOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
      <Envelope
        title={title}
        message={message}
        onOpen={() => setIsOpen(true)}
      />
      {!isOpen && (
        <Typography
          component="div"
          variant="caption"
          color={theme.palette.text.disabled}
          style={{
            position: 'absolute',
            bottom: theme.spacing(2),
            width: '100%',
            textAlign: 'center',
          }}
        >
          (Click on the envelope to open it.)
        </Typography>
      )}
    </Box>
  );
}
