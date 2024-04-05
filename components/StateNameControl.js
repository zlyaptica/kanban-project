import { Action } from '@/utils/Enums'
import styles from '@/styles/StateNameControl.module.css'
import { useEffect, useState } from "react"

const StateNameControl = (props) => {
    const [isActiveInput, setIsActiveInput] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const headerTaskControl = styles.newStateButton + ' ' + styles.task
    const taskHeaderStyles = props.action == Action.updateStateName ? null : styles.input

 const handleKeyDown = (e) => {
        if (e.keyCode === 27) {
            setIsActiveInput(false)
            setInputValue('')
            if (props.status == Status.updateStateName || props.status == Status.updateTaskName) {
                setInputValue(props.stateName)
            }
        }

        if (e.keyCode === 13) {
            confirmButton()
        }
    }

    const confirmButton = () => {
        console.log("подтвердили кнопку")
    }

    // const handleKeyDown = (e) => {
    //     if (e.keyCode === 27) {
    //         setIsActiveInput(false)
    //         setInputValue('')
    //         if (props.status == Status.updateStateName || props.status == Status.updateTaskName) {
    //             setInputValue(props.stateName)
    //         }
    //     }

    //     if (e.keyCode === 13) {
    //         confirmButton()
    //     }
    // }

    // const confirmButton = () => {
    //     if (inputValue) {
    //         if (props.status == Status.createState) props.confirmButton(inputValue)
    //         if (props.status == Status.updateStateName) props.confirmButton(inputValue, props.stateID)
    //         if (props.status == Status.createTask) props.confirmButton(props.stateID, props.tasks, inputValue)
    //         if (props.status == Status.updateTaskName) props.confirmButton(props.stateID, inputValue)

    //         if (props.status == Status.createState || props.status == Status.createTask) {
    //             setInputValue('')
    //         }
    //     }
    //     setIsActiveInput(false)
    // }

    useEffect(() => {
        if (props.action == Action.updateStateName) setInputValue(props.stateName)
        if (props.action == Action.updateTaskName) setInputValue(props.stateName)
    }, [props.action, props.nameControlHeader])

    return (
        <div className={styles.control}>
            {!isActiveInput
                ?
                <p className={props.action == Action.createTask ? headerTaskControl : styles.newStateButton}
                    onClick={() => setIsActiveInput(true)} onKeyDown={(e) => handleKeyDown(e)}>
                    {props.nameControlHeader}
                </p>
                :
                <div className={styles.inputControl}>
                    <form>
                        <input className={taskHeaderStyles} type="text" name="stateName" placeholder="Введете название состояния" onBlur={() => confirmButton()}
                            autoFocus onChange={(e) => setInputValue(e.target.value)} value={inputValue} required onKeyDown={(e) => handleKeyDown(e)} />
                    </form>
                </div>
            }
        </div>
    )
}

export { StateNameControl }