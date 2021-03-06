import {
    Avatar,
    Box, Button,
    Card, CardActions,
    CardContent,
    Grid,
    Step,
    StepConnector,
    StepLabel,
    Stepper,
    Typography, withWidth,
} from "@material-ui/core"
import Img from "../img/project.png"
import {makeStyles, withStyles} from "@material-ui/core/styles"
import {Rating} from "@material-ui/lab"
import Filter1Icon from '@material-ui/icons/Filter1'
import Filter2Icon from '@material-ui/icons/Filter2'
import Filter3Icon from '@material-ui/icons/Filter3'
import Filter4Icon from '@material-ui/icons/Filter4'
import Filter5Icon from '@material-ui/icons/Filter5'
import clsx from "clsx"
import {amber, green, lightGreen, lime, orange} from "@material-ui/core/colors"
import {useContext, useEffect, useState} from "react"
import axios from "axios"
import DescriptionIcon from "@material-ui/icons/Description"
import {UserContext} from "../components/Layout"
import {jsPDF} from "jspdf"
import '../fonts/PTSans-normal'
import Avatar1 from "../img/avatar1.png"
import Avatar2 from "../img/avatar2.png"
import Avatar3 from "../img/avatar3.png"
import Avatar4 from "../img/avatar4.png"
import Avatar5 from "../img/avatar5.png"
import Avatar6 from "../img/avatar6.png"

const useStyles = makeStyles(theme => ({
    media: {
        width: '100%',
        maxHeight: '50vh'
    },
    subtitle: {
        fontSize: 18,
        color: 'grey',
        marginBottom: 10,
    },
    block: {
        margin: '25px 5px',
        padding: '10px 15px',
    },
    [theme.breakpoints.down('xs')]: {
        step: {
            width: '100%',
            padding: '10px 0'
        }
    },
}))

const colors = [orange[500], amber[500], lime[500], lightGreen[500], green[500]]

export const Project = withWidth()((props) => {
    const classes = useStyles()

    const [project, setProject] = useState({})
    const [rating, setRating] = useState(0)

    useEffect(() => {
        axios.get(`/projects/get/${props.id}`).then((res) => {
            setProject(res.data[0])
            setRating(res.data[0].rating ? res.data[0].rating.map(e => Object.values(e)[0]).reduce((total, e) => total + e, 0) / res.data[0].rating.length : 0)
        })
    }, [props.id])

    const ColorlibConnector = withStyles((theme) => ({
        alternativeLabel: {
            top: 22,
        },
        active: {
            '& $line': {
                background: colors[project.stage]
            },
        },
        completed: {
            '& $line': {
                background: colors[project.stage]
            },
        },
        line: {
            height: 3,
            border: 0,
            backgroundColor: '#eaeaf0',
            borderRadius: 1,
        },
        [theme.breakpoints.down('xs')]: {
            line: {
                display: 'none'
            }
        },
    }))(StepConnector)

    const useColorlibStepIconStyles = makeStyles({
        root: {
            backgroundColor: '#ccc',
            zIndex: 1,
            color: '#fff',
            width: 50,
            height: 50,
            display: 'flex',
            borderRadius: '50%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        active: {
            background: colors[project.stage],
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        },
        completed: {
            background: colors[project.stage]
        },
    })

    const ColorlibStepIcon = (props) => {
        const classes = useColorlibStepIconStyles()
        const {active, completed} = props

        const icons = {
            1: <Filter1Icon/>,
            2: <Filter2Icon/>,
            3: <Filter3Icon/>,
            4: <Filter4Icon/>,
            5: <Filter5Icon/>,
        }

        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: active,
                    [classes.completed]: completed,
                })}
            >
                {icons[String(props.icon)]}
            </div>
        )
    }

    const UserInfo = (props) => (
        <Box display='flex'
             style={{alignItems: 'center', padding: 10, border: '1px solid rgba(0,0,0,0.2)', borderRadius: 5}}>
            <Avatar alt="Remy Sharp" src={props.avatar}/>
            <Typography style={{paddingLeft: 10}}>{props.name}</Typography>
        </Box>
    )

    const Block = (props) => {
        const classes = useStyles()
        return (
            <div className={classes.block} style={{borderLeft: `3px solid ${props.color}`}}>
                {props.children}
            </div>
        )
    }

    const steps = [
        'Стадия проработки 1',
        'Стадия проработки 2',
        'Стадия проработки 3',
        'Стадия проработки 4',
        'Стадия проработки 5',
    ]

    const userInfo = useContext(UserContext)

    return (
        <Card>
            <img className={classes.media} src={Img} alt='wallpaper'/>
            <CardContent className={classes.content}>
                <Box display='flex' flexWrap='wrap' justifyContent={props.width === 'xs' ? 'center' : 'space-between'}>
                    <div style={props.width === 'xs' ? {
                        width: '100%',
                        textAlign: 'center',
                        paddingBottom: 15
                    } : undefined}>
                        <Typography variant='h6' style={{fontWeight: 'bold'}}>
                            {project.title}
                        </Typography>
                    </div>
                    <Rating
                        name='name'
                        value={rating}
                        precision={0.5}
                        size='large'
                        onChange={(e, newValue) => {
                            axios.post('/rate', {
                                project_id: props.id,
                                username: userInfo,
                                score: newValue
                            }).then(r => {
                                setRating(r.data.rating)
                            })
                        }}
                    />
                </Box>

                <Stepper
                    alternativeLabel
                    activeStep={project.stage}
                    connector={<ColorlibConnector/>}
                    style={{paddingLeft: 0, paddingRight: 0}}
                    orientation={props.width === 'xs' ? 'vertical' : undefined}
                >
                    {steps.map(label => (
                        <Step key={label} className={classes.step}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Block color={colors[project.stage]}>
                    <Typography className={classes.subtitle}>
                        Описание
                    </Typography>
                    <Typography style={{whiteSpace: 'pre-wrap'}}>
                        {project.desc}
                    </Typography>
                </Block>

                <Block color={colors[project.stage]}>
                    <Typography className={classes.subtitle}>
                        Область применения
                    </Typography>
                    <Typography>
                        {project.appArea || 'Информация отсутствует'}
                    </Typography>
                </Block>

                <Block color={colors[project.stage]}>
                    <Typography className={classes.subtitle}>
                        Необходимые ресурсы
                    </Typography>
                    <Typography>
                        {project.resources || 'Информация отсутствует'}
                    </Typography>
                </Block>

                <Block color={colors[project.stage]}>
                    <Typography className={classes.subtitle}>
                        Стейкхолдеры
                    </Typography>
                    <Typography>
                        Зорин Д.О.
                    </Typography>
                    <Typography>
                        Корчуганов Т.В.
                    </Typography>
                </Block>

                <Grid container spacing={1} style={{marginTop: -12}}>
                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={12} sm={6} style={{paddingTop: 0, paddingBottom: 0}}>
                            <Block color={colors[project.stage]}>
                                <Typography className={classes.subtitle}>
                                    Бизнес план
                                </Typography>
                                {project.plan ? (
                                    <Box display='flex' alignItems='center'>
                                        <DescriptionIcon/>
                                        <Typography style={{flexGrow: 1}}>
                                            {project.plan}
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Typography style={{flexGrow: 1}}>
                                        Отсутствует
                                    </Typography>
                                )}
                            </Block>
                        </Grid>
                        <Grid item xs={12} sm={6} style={{
                            paddingTop: 0,
                            paddingBottom: 0,
                            marginTop: props.width === 'xs' ? -25 : undefined
                        }}>
                            <Block color={colors[project.stage]}>
                                <Typography className={classes.subtitle}>
                                    Рабочая документация
                                </Typography>
                                <Box display='flex' alignItems='center'>
                                    <DescriptionIcon/>
                                    <Typography style={{flexGrow: 1}}>
                                        Документация.pdf
                                    </Typography>
                                </Box>
                            </Block>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={12} sm={6} style={{paddingTop: 0, paddingBottom: 0}}>
                            <Block color={colors[project.stage]}>
                                <Typography className={classes.subtitle}>
                                    Сроки реализации
                                </Typography>
                                <Typography>
                                    04.02.2021 - 07.02.2021
                                </Typography>
                            </Block>
                        </Grid>
                        <Grid item xs={12} sm={6} style={{
                            paddingTop: 0,
                            paddingBottom: 0,
                            marginTop: props.width === 'xs' ? -25 : undefined
                        }}>
                            <Block color={colors[project.stage]}>
                                <Typography className={classes.subtitle}>
                                    Оценка куратора
                                </Typography>
                                <Rating
                                    value={4}
                                    precision={0.5}
                                    size='large'
                                    readOnly
                                />
                            </Block>
                        </Grid>
                    </Grid>
                </Grid>

                <Typography className={classes.subtitle}>
                    Состав команды
                </Typography>
                <Grid container spacing={1}>
                    <Grid container item xs={12} spacing={props.width === 'xs' ? 1 : 3}>
                        <Grid item xs={12} sm={6}>
                            <UserInfo name='Пользователь 1' avatar={Avatar1}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <UserInfo name='Пользователь 2' avatar={Avatar2}/>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={props.width === 'xs' ? 1 : 3}>
                        <Grid item xs={12} sm={6}>
                            <UserInfo name='Пользователь 3' avatar={Avatar3}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <UserInfo name='Пользователь 4' avatar={Avatar4}/>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={props.width === 'xs' ? 1 : 3}>
                        <Grid item xs={12} sm={6}>
                            <UserInfo name='Пользователь 5' avatar={Avatar5}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <UserInfo name='Пользователь 6' avatar={Avatar6}/>
                        </Grid>
                    </Grid>
                </Grid>
                <CardActions>
                    <Button color='primary' onClick={() => {
                        const doc = new jsPDF()
                        doc.setFont('PTSans')
                        doc.setFontSize(16)
                        doc.text(project.title, 10, 15)
                        doc.setFontSize(13)
                        doc.text('Описание', 10, 30)
                        doc.setFontSize(12)
                        doc.text(doc.splitTextToSize(project.desc, 190), 10, 40)
                        doc.setFontSize(13)
                        doc.text('Область применения', 10, 140)
                        doc.setFontSize(12)
                        doc.text(doc.splitTextToSize(project.appArea, 190), 10, 150)
                        doc.setFontSize(13)
                        doc.text('Необходимые ресурсы', 10, 200)
                        doc.setFontSize(12)
                        doc.text(doc.splitTextToSize(project.resources, 190), 10, 210)
                        doc.save(`${project.title}.pdf`)
                    }}>
                        Сохранить PDF
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
})
