import React from 'react'
import {AppBar, Button, Card, Container, fade, IconButton, InputBase, Toolbar, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import SearchIcon from '@material-ui/icons/Search'
import {NoteAdd, Apps} from "@material-ui/icons";
import {navigate} from "@reach/router";

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
        // vertical padding + font size from searchIcon
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
        paddingLeft: theme.spacing(3)
    }
}))

export const Layout = (props) => {
    const classes = useStyles()

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
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
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>
                    <div>
                        <IconButton
                            className={classes.iconButton}
                            edge="end"
                            color="inherit"
                            onClick={() => navigate('/projects')}
                        >
                            <Apps/>
                        </IconButton>
                        <IconButton
                            className={classes.iconButton}
                            edge="end"
                            color="inherit"
                            onClick={() => navigate('/create')}
                        >
                            <NoteAdd/>
                        </IconButton>
                    </div>
                    <Button className={classes.login} color="inherit">Войти</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" style={{padding: 20}}>
                <Card>
                    {props.children}
                </Card>
            </Container>
        </div>
    )
}
