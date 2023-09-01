import { Typography } from '@mui/material'

export default function ListReplace({text}: {text: string}) {
  return (
    <Typography fontWeight={700} fontSize={48} align='center' sx={{ my: 32 }}>{text}</Typography>
  )
}
