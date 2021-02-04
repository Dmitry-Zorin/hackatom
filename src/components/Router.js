import {Router} from '@reach/router'
import {Project} from "../routes/Project"
import {CreateProject} from "../routes/CreateProject"
import {Projects} from "../routes/Projects";

export const Routes = () => (
    <Router primary={false}>
        <Projects path='/projects' default/>
        <Project path='/projects/:id'/>
        <CreateProject path='/create'/>
    </Router>
)
