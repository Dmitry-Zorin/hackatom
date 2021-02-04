import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import Img from "../img/project.png";
import {navigate} from "@reach/router";
import {Rating} from "@material-ui/lab";

const data = new Array(20).fill(0).map(() => ({
    img: Img,
    title: 'Название проекта',
    project_id: 1
}))

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    subheader: {
        padding:  theme.spacing(1),
        fontSize: 26,
        textAlign: 'center'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}))

export const Projects = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <GridList cellHeight={180}>
                <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
                    <ListSubheader
                        className={classes.subheader}
                        component="div"
                    >
                        Список проектов
                    </ListSubheader>
                </GridListTile>
                {data.map((tile) => (
                    <GridListTile key={tile.img}>
                        <img src={tile.img} alt={tile.title}/>
                        <GridListTileBar
                            title={tile.title}
                            subtitle={<Rating
                                defaultValue={2 + 3 * Math.random()}
                                precision={0.5}
                                size='large'
                            />}
                            actionIcon={
                                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon} onClick={() => navigate(`projects/${tile.project_id}`)}>
                                    <InfoIcon/>
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}
