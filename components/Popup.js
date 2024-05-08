import classes from '@/styles/Popup.module.css'

const Popup = ({active, setActive, children}) => {
    const popupActive = classes.popup + ' ' + classes.active
    const popupContentActive = classes.popupContent + ' ' + classes.active
    return (
        <div className={active ? popupActive : classes.popup} onClick={() => setActive(false)}>
            <div className={active ? popupContentActive : classes.popupContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export {Popup}