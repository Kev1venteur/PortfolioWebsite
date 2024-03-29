import React from 'react'
import help_descriptions from '../../Resources/constants/help_descriptions.json'

let allCommands = [
    {
        command:'clear',
        arguments:1,
        runFunction:(allPackages)=>{return 'clear'}
    },
    {
        command:'help',
        arguments:1,
        runFunction:(allPackages)=>helpArray()
    },
    {
        command:'ls',
        arguments:1,
        runFunction:(allPackages)=>handleLS(allPackages)
    },
    {
        command:'open',
        arguments:2,
        runFunction:(allPackages)=>handleOPEN(allPackages)
    },
    {
        command:'reset',
        arguments:1,
        runFunction:(allPackages)=>allPackages.os.reset()
    }
]

const ParseCommand = (command,allPackages) =>{
    allPackages={...allPackages,commandSelector:command.split(" "),}
    let result = [];
    
    let foundCommand = false;
    allCommands.forEach((commandObj)=>{
        if(commandObj.command === allPackages.commandSelector[0]){
            foundCommand = true;
            if(allPackages.commandSelector.length === commandObj.arguments){
                result = commandObj.runFunction(allPackages);
                return result
            }
            else{
                result = rejectCommand(allPackages.commandSelector.length,commandObj.arguments)
                return result;
            }
        }
    })

    if(!foundCommand)
        result = [<p>{command} is not a recognized command</p>,<p>Type "help" for list of commands<br/>⠀</p>]
   
    return result
}

const handleLS = (allPackages) =>{
    const { os } = allPackages;
    let result = []
    let respond = os.ls();
    respond.map((item)=>{
        if(item.type === "folder")
            return result.push(<p  className="indented I">{item.name}/</p>)
        else
            return result.push(<p  className="indented">{item.name}</p>)
    })
    result.push(<br/>)
    return result;
}

const handleOPEN = (allPackages) =>{
    const { os, commandSelector, path } = allPackages;
    let result = [];
    let owners = os.open(commandSelector[1],path)
    if(!owners)
        result.push(<p>{commandSelector[1]} not found<br/>⠀</p>)
    else if(owners.length === 0 || owners.includes(os.user))
        result.push(<p>Opening {commandSelector[1]}<br/>⠀</p>)
    else
        result.push(<p>Permission denied owners: {owners.map((owner)=>owner)}<br/>⠀</p>)

    return result;
}

const helpArray = () =>{
    let result = help_descriptions.map((commandObj)=>{
        return <p className="indented">
                    <b className='I'>[{commandObj.command}] </b>
                    : {commandObj.description}
                </p>
    })
    result.push(<br/>)
    return result;

}

const rejectCommand = (received,expected) =>{
    return <p>Incorrect Number of arguments. Received: {received}, expected: {expected}<br/>⠀</p>;  
}

export default ParseCommand