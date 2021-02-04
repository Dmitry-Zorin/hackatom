import {
    Avatar,
    Box,
    CardContent,
    Step,
    StepConnector,
    StepLabel,
    Stepper,
    Typography,
} from "@material-ui/core"
import Img from "../img/project.png"
import {makeStyles, withStyles} from "@material-ui/core/styles"
import {AvatarGroup, Rating} from "@material-ui/lab"
import Filter1Icon from '@material-ui/icons/Filter1'
import Filter2Icon from '@material-ui/icons/Filter2'
import Filter3Icon from '@material-ui/icons/Filter3'
import Filter4Icon from '@material-ui/icons/Filter4'
import Filter5Icon from '@material-ui/icons/Filter5'
import clsx from "clsx"
import {green} from "@material-ui/core/colors"

const useStyles = makeStyles({
    media: {
        width: '100%',
        maxHeight: '50vh'
    }
})

export const Project = () => {
    const classes = useStyles()

    const ColorlibConnector = withStyles({
        alternativeLabel: {
            top: 22,
        },
        active: {
            '& $line': {
                background: green[500]
            },
        },
        completed: {
            '& $line': {
                background: green[500]
            },
        },
        line: {
            height: 3,
            border: 0,
            backgroundColor: '#eaeaf0',
            borderRadius: 1,
        },
    })(StepConnector)

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
            background: green[500],
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        },
        completed: {
            background: green[500]
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

    const steps = [
        'Стадия 1',
        'Стадия 2',
        'Стадия 3',
        'Стадия 4',
        'Стадия 5',
    ]

    return (
        <>
            <img className={classes.media} src={Img} alt='wallpaper'/>
            <CardContent>
                <Box display='flex'>
                    <Typography
                        variant="h5"
                        style={{fontWeight: 'bold', flexGrow: 1}}
                    >
                        Название проекта
                    </Typography>
                    <Rating
                        defaultValue={4}
                        precision={0.5}
                        size='large'
                    />
                </Box>
                <Stepper alternativeLabel activeStep={2} connector={<ColorlibConnector/>}
                         style={{paddingLeft: 0, paddingRight: 0}}>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Typography>
                    Описание проекта ...
                </Typography>
                <br/>
                <Typography>
                    Участники
                </Typography>
                <AvatarGroup max={4}>
                    <Avatar alt="Remy Sharp" src="/"/>
                    <Avatar alt="Travis Howard" src="/"/>
                    <Avatar alt="Cindy Baker" src="/"/>
                    <Avatar alt="Agnes Walker" src="/"/>
                    <Avatar alt="Trevor Henderson" src="/"/>
                </AvatarGroup>
            </CardContent>
            {/*<CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>*/}
        </>
    )
}
