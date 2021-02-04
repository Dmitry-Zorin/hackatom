import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography,} from "@material-ui/core"
import {makeStyles,} from "@material-ui/core/styles"
import {useState} from "react";
import {navigate} from "@reach/router";
import axios from "axios";

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
    }
}))

export const CreateProject = () => {
    const classes = useStyles()
    const [stage, setStage] = useState('')

    return (
        <div className={classes.root}>
            <Typography
                className={classes.title}
                variant="h5"
            >
                Новый проект
            </Typography>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Название" variant="outlined" fullWidth/>
                <TextField id="outlined-basic" label="Описание" variant="outlined" fullWidth multiline/>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Стадия</InputLabel>
                    <Select
                        value={stage}
                        onChange={e => setStage(e.target.value)}
                        label="Стадия"
                    >
                        <MenuItem value={0}>Стадия 1</MenuItem>
                        <MenuItem value={1}>Стадия 2</MenuItem>
                        <MenuItem value={2}>Стадия 3</MenuItem>
                        <MenuItem value={3}>Стадия 4</MenuItem>
                        <MenuItem value={4}>Стадия 5</MenuItem>
                    </Select>
                </FormControl>
                <Box className={classes.button} display='flex'>
                    <Button variant="contained" color="secondary" onClick={() => navigate('/projects')}>
                        Отмена
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => {
                        axios.post('http://eddc2cbfe7e2.ngrok.io/projects/add', {
                            name: '1',
                            description: '2',
                            stage: 3
                        }).then((project_id) => {
                            navigate(`/projects/${project_id}`)
                        })
                    }}>
                        Создать
                    </Button>
                </Box>
            </form>
        </div>
    )
}
