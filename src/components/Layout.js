import React, {useState} from 'react'
import {
    AppBar, Box,
    Button,
    Container, createMuiTheme, Dialog, DialogActions, DialogContent, DialogTitle,
    fade,
    IconButton,
    InputBase,
    MuiThemeProvider, TextField,
    Toolbar,
    Typography
} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import SearchIcon from '@material-ui/icons/Search'
import {NoteAdd, Apps} from "@material-ui/icons"
import {navigate} from "@reach/router"
import ForumIcon from '@material-ui/icons/Forum'

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

export const Layout = (props) => {
    const classes = useStyles()

    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

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
                        <IconButton
                            className={classes.iconButton}
                            color="inherit"
                            onClick={() => navigate('/projects/create')}
                        >
                            <NoteAdd/>
                        </IconButton>
                        <Button className={classes.login} color="inherit" onClick={() => setOpen(true)}>
                            Войти
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" style={{padding: 20}}>
                {props.children}
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
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="inherit">
                        Зарегистрироваться
                    </Button>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Войти
                    </Button>
                </DialogActions>
            </Dialog>
        </MuiThemeProvider>
    )
}
