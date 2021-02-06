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
import {useContext, useEffect, useState} from "react"
import axios from "axios"
import MessageIcon from '@material-ui/icons/Message'
import {UserContext} from "../components/Layout"

import Avatar1 from "../img/avatar1.png"
import Avatar2 from "../img/avatar2.png"
import Avatar3 from "../img/avatar3.png"
import Avatar4 from "../img/avatar4.png"
import Avatar5 from "../img/avatar5.png"
import Avatar6 from "../img/avatar6.png"
import Avatar7 from "../img/avatar7.png"
import Avatar8 from "../img/avatar8.jpg"

const avatars = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8]

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
    const userInfo = useContext(UserContext)

    const [messages, setMessages] = useState([])
    const [open, setOpen] = useState(false)
    const [text, setText] = useState('')
    const [info, setInfo] = useState(false)
    const [index, setIndex] = useState(0)

    const getMessages = () => {
        axios.get('/messages/get').then(res => {
            setMessages(res.data)
        })
    }

    useEffect(getMessages, [])

    return (
        <>
            {userInfo && (
                <Box display='flex' justifyContent='center'>
                    <Button className={styles.button} variant="contained" color="primary" onClick={() => setOpen(true)}>
                        <MessageIcon className={styles.icon}/>
                        Оставить объявление
                    </Button>
                </Box>
            )}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='sm'>
                <DialogTitle>Новое объявление</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Объявление"
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
                                author: userInfo,
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
                {messages?.length ? messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((m, i) => (
                    <Card key={`${m.author}${m.timestamp}`} className={styles.card}>
                        <CardActionArea onClick={() => {
                            setInfo(m.author)
                            setIndex(i)
                        }}>
                            <CardHeader
                                avatar={<Avatar src={avatars[i % 8]}/>}
                                title={m.author}
                                subheader={new Date(m.timestamp).toLocaleString('ru-RU')}
                            />
                        </CardActionArea>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p" style={{whiteSpace: 'pre-wrap'}}>
                                {m.text}
                            </Typography>
                        </CardContent>
                    </Card>
                )) : undefined}
            </List>
            <Dialog open={!!info?.length} onClose={() => setInfo(false)} fullWidth maxWidth='sm'>
                <DialogTitle>
                    <Box display='flex'>
                        <Avatar className={styles.icon} src={avatars[index % 8]}/>
                        {info}
                    </Box>
                </DialogTitle>
                <DialogContent style={{padding: 25, paddingTop: 0}}>
                    <Typography variant='h6'>
                        Контакты
                    </Typography>
                    <Typography>
                        {`Телефон: +7(${userInfo ? '916)123-4567' : '***)***-****'}`}
                    </Typography>
                    <Typography>
                        {`Telegram: @${userInfo ? 'telegram' : '********'}`}
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    )
}
