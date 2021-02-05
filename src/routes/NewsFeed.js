import {
    Avatar,
    Box,
    Button,
    Card, CardActionArea, CardContent,
    CardHeader,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
    List,
    makeStyles, TextField, Typography
} from "@material-ui/core"
import {useEffect, useState} from "react"
import axios from "axios"
import MessageIcon from '@material-ui/icons/Message'

const useStyles = makeStyles(() => (
    {
        card: {
            marginLeft: 0,
            marginBottom: 15
        },
        padding: {
            padding: '1.25em'
        },
        margin: {
            margin: '0 auto'
        },
        button: {
            padding: '10px 15px',
            marginBottom: 10
        },
        icon: {
            marginRight: 10
        }
    }
))
export const NewsFeed = () => {
    const styles = useStyles()

    const [messages, setMessages] = useState([])
    const [open, setOpen] = useState(false)
    const [text, setText] = useState('')
    const [info, setInfo] = useState(false)

    const getMessages = () => {
        axios.get('/messages/get').then(res => {
            setMessages(res.data)
        })
    }

    useEffect(getMessages, [])

    return (
        <>
            <Box display='flex' justifyContent='center'>
                <Button className={styles.button} variant="contained" color="primary" onClick={() => setOpen(true)}>
                    <MessageIcon className={styles.icon}/>
                    Написать сообщение
                </Button>
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='sm'>
                <DialogTitle>Новое сообщение</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Сообщение"
                        fullWidth
                        multiline
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Отмена
                    </Button>
                    <Button
                        onClick={() => {
                            setOpen(false)
                            axios.post('/messages/add', {
                                author: 'Пользователь ' + Math.round(Math.random() * 1000),
                                text
                            }).then(getMessages)
                        }}
                        color="primary"
                    >
                        Отправить
                    </Button>
                </DialogActions>
            </Dialog>
            <List>
                {messages?.length ? messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((m) => (
                    <Card key={`${m.author}${m.timestamp}`} className={styles.card}>
                        <CardActionArea onClick={() => setInfo(m.author)}>
                            <CardHeader
                                avatar={<Avatar/>}
                                title={m.author}
                                subheader={new Date(m.timestamp).toLocaleString('ru-RU')}
                            />
                        </CardActionArea>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {m.text}
                            </Typography>
                        </CardContent>
                    </Card>
                )) : undefined}
            </List>
            <Dialog open={!!info?.length} onClose={() => setInfo(false)} fullWidth maxWidth='sm'>
                <DialogTitle>
                    <Box display='flex'>
                        <Avatar className={styles.icon}/>
                        {info}
                    </Box>
                </DialogTitle>
                    <DialogContent style={{padding: 25, paddingTop: 0}}>
                    <Typography variant='h6'>
                        Контакты
                    </Typography>
                    <Typography>
                        Телефон: +7(916)123-4567
                    </Typography>
                    <Typography>
                        Telegram: @telegram
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    )
}
