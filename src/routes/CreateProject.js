import {Box, Button, Card, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {useCallback, useState} from "react"
import {navigate} from "@reach/router"
import axios from "axios"
import {useDropzone} from "react-dropzone"
import DescriptionIcon from '@material-ui/icons/Description'
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    form: {
        '& > *': {
            marginTop: theme.spacing(2)
        }
    },
    button: {
        justifyContent: 'space-between'
    },
    dropzone: {
        height: 50,
        border: '1px dashed rgba(0,0,0,0.2)',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
            border: '1px dashed rgba(0,0,0,0.6)',
            background: 'rgba(0, 0, 0, 0.01)'
        }
    }
}))

export const CreateProject = () => {
    const classes = useStyles()
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [stage, setStage] = useState(0)
    const [plan, setPlan] = useState()

    const onDrop = useCallback(acceptedFiles => {
        setPlan(acceptedFiles[0].name)
    }, [])

    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return (
        <Card className={classes.root}>
            <Typography
                className={classes.title}
                variant="h5"
            >
                Новый проект
            </Typography>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField
                    label="Название"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <TextField
                    label="Описание"
                    variant="outlined"
                    fullWidth
                    multiline
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                />
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Стадия</InputLabel>
                    <Select
                        label="Стадия"
                        value={stage}
                        onChange={e => setStage(e.target.value)}
                    >
                        <MenuItem value={0}>Стадия 1</MenuItem>
                        <MenuItem value={1}>Стадия 2</MenuItem>
                        <MenuItem value={2}>Стадия 3</MenuItem>
                        <MenuItem value={3}>Стадия 4</MenuItem>
                        <MenuItem value={4}>Стадия 5</MenuItem>
                    </Select>
                </FormControl>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className={classes.dropzone}>
                        <Typography>
                            Добавить бизнес-план ...
                        </Typography>
                    </div>
                </div>
                {plan && (
                    <Box display='flex' alignItems='center'>
                        <DescriptionIcon/>
                        <Typography style={{flexGrow: 1}}>
                            {plan}
                        </Typography>
                        <IconButton onClick={() => setPlan(undefined)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )}
                <Box className={classes.button} display='flex'>
                    <Button variant="contained" color="inherit" onClick={() => navigate('/projects')}>
                        Отмена
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => {
                        axios.post('/projects/add', {title, desc, stage, plan})
                            .then((res) => {
                                navigate(`/projects/${res.data._id}`)
                            })
                    }}>
                        Создать
                    </Button>
                </Box>
            </form>
        </Card>
    )
}
