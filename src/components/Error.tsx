import { Typography, useTheme } from '@mui/material';

interface IOwnProps {
  code: number;
}

export default function Error({ code }: IOwnProps) {
  const theme = useTheme();

  const message = (() => {
    switch (code) {
      case 400:
        return 'Invalid message.';
      case 404:
      default:
        return 'Invalid path.';
    }
  })();

  return (
    <Typography
      variant="h4"
      sx={{
        width: '100%',
        textAlign: 'center',
        height: '100%',
        marginTop: theme.spacing(2),
      }}
    >
      {message}
    </Typography>
  );
}
