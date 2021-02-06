import React, {createContext, useState} from 'react'
import {
    AppBar, Avatar, Box,
    Button, Checkbox,
    Container, createMuiTheme, Dialog, DialogActions, DialogContent, DialogTitle,
    fade, FormControlLabel,
    IconButton,
    InputBase, Menu, MenuItem,
    MuiThemeProvider, TextField,
    Toolbar,
    Typography
} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import SearchIcon from '@material-ui/icons/Search'
import {NoteAdd, Apps, AccountCircle} from "@material-ui/icons"
import {navigate} from "@reach/router"
import ForumIcon from '@material-ui/icons/Forum'
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    iconButton: {
        padding: theme.spacing(2)
    },
    login: {
        padding: `10px ${theme.spacing(2)}px`
    },
    [theme.breakpoints.down('xs')]: {
        dialog: {
            padding: 50
        }
    },
    icon: {
        marginRight: 10
    }
}))

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(',')
    }
})

export const UserContext = createContext(0)

export const Layout = (props) => {
    const classes = useStyles()

    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(localStorage.getItem('username'))
    const [menu, setMenu] = useState(null)
    const [info, setInfo] = useState('')
    const [accept, setAccept] = useState(false)

    return (
        <MuiThemeProvider theme={theme}>
            <AppBar position="sticky">
                <Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Box display={{xs: 'none', sm: 'flex'}} style={{flexGrow: 1}}>
                        <Typography className={classes.title} variant="h6">
                            Бизнес-лаб
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                    </Box>
                    <Box display='flex' justifyContent='flex-end'>
                        <IconButton
                            className={classes.iconButton}
                            color="inherit"
                            onClick={() => navigate('/projects')}
                        >
                            <Apps/>
                        </IconButton>
                        <IconButton
                            className={classes.iconButton}
                            color="inherit"
                            onClick={() => navigate('/newsfeed')}
                        >
                            <ForumIcon/>
                        </IconButton>
                        {user ? (
                            <div>
                                <IconButton
                                    className={classes.iconButton}
                                    color="inherit"
                                    onClick={() => navigate('/projects/create')}
                                >
                                    <NoteAdd/>
                                </IconButton>
                                <IconButton
                                    className={classes.iconButton}
                                    color="inherit"
                                    onClick={e => setMenu(e.currentTarget)}
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    anchorEl={menu}
                                    keepMounted
                                    open={!!menu}
                                    onClose={() => setMenu(null)}
                                >
                                    <MenuItem onClick={() => {
                                        setMenu(null)
                                        setInfo(user)
                                    }}>
                                        Аккаунт
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        setMenu(null)
                                        setUser(undefined)
                                        localStorage.removeItem('username')
                                    }}>
                                        Выйти
                                    </MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <Button className={classes.login} color="inherit" onClick={() => {
                                setOpen(true)
                            }}>
                                Войти
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" style={{padding: 20}}>
                <UserContext.Provider value={user}>
                    {props.children}
                </UserContext.Provider>
            </Container>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='sm'>
                <DialogTitle>Логин</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Пользователь"
                        fullWidth
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Пароль"
                        fullWidth
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={(
                            <Checkbox color="primary" checked={accept} onChange={e => setAccept(e.target.checked)}/>
                        )}
                        label={(
                            <a href='http://www.consultant.ru/document/cons_doc_LAW_61801/6c94959bc017ac80140621762d2ac59f6006b08c/'
                               target='blank'>
                                Я согласен на обработку персональных данных
                            </a>
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="inherit" onClick={() => {
                        if (!accept) return alert('Требуется согласия на обработку персональных данных')
                        setOpen(false)
                        axios.post('/register', {username, password})
                            .then(res => {
                                if (res.data?.error) {
                                    return alert(res.data.error)
                                }
                                setUser(res.data.username)
                                localStorage.setItem('username', username)
                            })
                    }}>
                        Зарегистрироваться
                    </Button>
                    <Button color="primary" onClick={() => {
                        setOpen(false)
                        axios.post('/authorize', {username, password})
                            .then(res => {
                                if (res.data?.error) {
                                    return alert(res.data.error)
                                }
                                setUser(res.data.username)
                                localStorage.setItem('username', username)
                            })
                    }}>
                        Войти
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={!!info} onClose={() => setInfo('')} fullWidth maxWidth='sm'>
                <DialogTitle>
                    <Box display='flex'>
                        <Avatar className={classes.icon}/>
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
        </MuiThemeProvider>
    )
}
