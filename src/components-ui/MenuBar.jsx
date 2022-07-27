import React, { Component } from 'react'
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import menuItems from '../data/menuItems.json'



const styles = {
    list: {
        width: 250,
    },
    links: {
        textDecoration: 'none',
    },
    menuHeader: {
        paddingLeft: '30px'
    }
};
class MenuBar extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    // método define o estado atual de um item de menu, ou seja, se está expandido 
    handleClick(item) {
        this.setState(prevState => (
            { [item]: !prevState[item] }
        ))
    }
    // se o item de menu não tiver nenhum filho, esse método simplesmente retornará um item de menu clicável que redireciona para qualquer local e se não tiver filho, esse método usará a recursão para ir até o último nível de filhos e retornará o item pela primeira condiçao.
    handler(children) {
        const { classes } = this.props
        const { state } = this
        return children.map((subOption) => {
            if (!subOption.children) {
                return (
                    <div key={subOption.name}>
                        <ListItem
                            button
                            key={subOption.name}>
                            <Link
                                to={subOption.url}
                                className={classes.links}>
                                <ListItemText
                                    inset
                                    primary={subOption.name}
                                />
                            </Link>
                        </ListItem>
                    </div>
                )
            }
            return (
                <div key={subOption.name}>
                    <ListItem
                        button
                        onClick={() => this.handleClick(subOption.name)}>
                        <ListItemText
                            inset
                            primary={subOption.name} />
                        {state[subOption.name] ?
                            <ExpandLessIcon /> :
                            <ExpandMoreIcon />
                        }
                    </ListItem>
                    <Collapse
                        in={state[subOption.name]}
                        timeout="auto"
                        unmountOnExit
                    >
                        {this.handler(subOption.children)}
                    </Collapse>
                </div>
            )
        })
    }
    render() {
        const { classes, drawerOpen, menuOptions } = this.props
        return (
            <div className={classes.list}>
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open
                    classes={{ paper: classes.list }}>
                    <div>
                        <List>
                            <ListItem
                                key="menuHeading"
                                divider
                                disableGutters
                            >
                                <ListItemText
                                    className={classes.menuHeader}
                                    inset
                                    primary="Raven BI"
                                />
                            </ListItem>
                            {this.handler(menuItems.data)}
                        </List>
                    </div>
                </Drawer>
            </div>
        )
    }
}
export default withStyles(styles)(MenuBar)