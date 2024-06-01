import {
  Box,
  Button,
  FormControl,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { MAX_CHAR_MESSAGE, MAX_CHAR_TITLE } from '../utils/constants';
import SnackBarContext from '../contexts/snackBarContext';
import { encryptMessage } from '../utils/helpers';
import { createSearchParams } from 'react-router-dom';

export default function Generate() {
  const theme = useTheme();
  const { showSnack } = useContext(SnackBarContext);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [generated, setGenerated] = useState<string>();
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [messageIsValid, setMessageIsValid] = useState(false);

  useEffect(() => {
    setTitleIsValid(title.length > 0 && title.length <= MAX_CHAR_TITLE);
  }, [title]);

  useEffect(() => {
    setMessageIsValid(message.length > 0 && message.length <= MAX_CHAR_MESSAGE);
  }, [message]);

  const handleGenerate = () => {
    const encryptedMessage = encryptMessage(message);
    const params = createSearchParams();
    params.append('title', title);
    params.append('message', encryptedMessage);
    setGenerated(`${window.location.origin}/view?${params.toString()}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generated!).then(() => {
      showSnack?.('Copied to clipboard!');
    });
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        gap: theme.spacing(2),
        alignItems: 'center',
        marginTop: theme.spacing(-2),
      }}
    >
      <Typography variant="h5">Create your own</Typography>
      <FormControl
        sx={{
          width: '50%',
        }}
      >
        <TextField
          label="Title"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
          helperText={
            <Typography
              variant="caption"
              color={titleIsValid ? 'default' : 'error'}
            >
              {title.length}&nbsp;/&nbsp;{MAX_CHAR_TITLE}
            </Typography>
          }
        />
      </FormControl>
      <FormControl
        sx={{
          width: '50%',
        }}
      >
        <TextField
          multiline
          label="Message"
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
          helperText={
            <Typography
              variant="caption"
              color={messageIsValid ? 'default' : 'error'}
            >
              {message.length}&nbsp;/&nbsp;{MAX_CHAR_MESSAGE}
            </Typography>
          }
        />
      </FormControl>
      <Button
        onClick={handleGenerate}
        variant="contained"
        disabled={!titleIsValid || !messageIsValid}
      >
        Generate
      </Button>
      {generated && (
        <>
          <Box sx={{ width: '50%', display: 'flex', gap: theme.spacing(1) }}>
            <TextField
              size="small"
              aria-readonly
              value={generated}
              sx={{ flexGrow: 1 }}
            />
            <Tooltip title="Copy to clipboard" placement="top">
              <IconButton onClick={handleCopy}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="caption">
            All done! You just need to send this link to the recipient.
          </Typography>
        </>
      )}
    </Box>
  );
}
