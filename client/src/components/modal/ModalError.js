import React from "react"

function ModalError ( {active, setActive, error, setError, data, setData} ) {
    // Закрытие модального окна через Escape
    document.addEventListener('keydown', function (e){
        if (e.code === "Escape") {
                setActive(false); setError(null); setData(null)
            }
    })

    return (
        <>
        {active && (
            <div className="modal__error" onClick={() => {setActive(false); setError(null); setData(null)}}>
                <div className="modal__content">
                    {
                        error &&
                        [
                        <div className="modal__title title__name">
                            Ошибка
                        </div>,
                        (JSON.parse(error).message).replace(/notNull Violation:/g, '').replace(/\n/g, '').split(',').map( (el ,index) => {
                            return (
                            <div className="navbar__url" key={index}>
                                {el}
                            </div>)
                        })
                        ]
                    }
                    {
                        data &&
                        <div className="modal__title title__name">
                            {data}
                        </div>
                    }
                </div>
            </div>
        )}
        </>
    )
}

export default ModalError