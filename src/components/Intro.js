import React from 'react'
import { Button } from 'semantic-ui-react'

import { Link } from 'react-router-dom'

const Intro = () => {
    return(
        <div >
            <Button as={Link} to='/home' >
                <Button.Content >Enter</Button.Content>
             </Button>
        </div>
    )
}

export default Intro