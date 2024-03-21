'use client'

const HandleTestData = (props) => {
    return (
        <div className="d-flex">
            <button className="" onClick={() => props.loadTestData()}>Загрузить тестовые данные</button>
            <button className="" onClick={() => props.deleteTestData()}>Удалить тестовые данные</button>

        </div>
    )
}

export {HandleTestData}