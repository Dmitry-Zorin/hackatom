import {Router} from '@reach/router'
import {Project} from "../routes/Project"
import {CreateProject} from "../routes/CreateProject"
import {Projects} from "../routes/Projects";
import {useEffect} from "react";
import {NewsFeed} from "../routes/NewsFeed";

const ScrollToTop = ({children, location}) => {
    useEffect(() => window.scrollTo(0, 0), [location.pathname])
    return children
}

export const Routes = () => (
    <Router primary={false}>
        <ScrollToTop path="/">
            <Projects path='/projects'/>
            <Project path='/projects/:id'/>
            <CreateProject path='/projects/create'/>
            <NewsFeed path='/newsfeed' default/>
        </ScrollToTop>
    </Router>
)
