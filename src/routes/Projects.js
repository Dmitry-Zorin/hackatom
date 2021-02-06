import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import Img from "../img/project.png"
import {navigate} from "@reach/router"
import {Rating} from "@material-ui/lab"
import axios from "axios"
import {amber, green, lightGreen, lime, orange} from "@material-ui/core/colors"
import {Card, withWidth} from "@material-ui/core";

const colors = [orange[500], amber[500], lime[500], lightGreen[500], green[500]]

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    subheader: {
        padding: theme.spacing(1),
        fontSize: 32,
        fontWeight: 300,
        textAlign: 'center'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}))

export const Projects = withWidth()((props) => {
    const classes = useStyles()
    const [projects, setProjects] = useState([])

    useEffect(() => {
        axios.get('/projects/get').then((res) => {
            setProjects(res.data)
        })
    }, [])

    return (
        <Card className={classes.root}>
            <GridList>
                <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
                    <ListSubheader
                        className={classes.subheader}
                        component="div"
                    >
                        Список проектов
                    </ListSubheader>
                </GridListTile>
                {projects.length && projects.map((tile) => (
                    <GridListTile key={tile._id}>
                        <img src={tile.img || Img} alt={tile.title}/>
                        <GridListTileBar
                            title={tile.title} style={{borderTop: `3px solid ${colors[tile.stage]}`}}
                            subtitle={
                                <Rating
                                    value={tile.rating.map(e => Object.values(e)[0]).reduce((total, e) => total + e, 0) / tile.rating.length}
                                    precision={0.5}
                                    size={props.width === 'xs' ? 'small' : 'large'}
                                    readOnly
                                />
                            }
                            actionIcon={
                                <IconButton className={classes.icon} onClick={() => navigate(`projects/${tile._id}`)}>
                                    <InfoIcon/>
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </Card>
    )
})
