import './JumpMenu.css';

function JumpMenu({
    totalPages, 
    jumpPageInput, 
    onInputChange, 
    onIncrement, 
    onDecrement, 
    onGo 
})
{
    return (
        <div className="menu-page-jump">
            <span className="menu-arrow"></span>

            <div className="menu-content">
                <h4 className="menu-header">Перейти на страницу</h4>
                <div className="menu-row">
                    <div className="menu-input-group">
                        <input type="number" 
                                min={1}
                                max={totalPages} 
                                step={1} 
                                value={jumpPageInput}
                                onChange={onInputChange}/>
                        <button className="btn-up"
                                onClick={onIncrement}>
                            +
                        </button>
                        <button className="btn-down"
                                onClick={onDecrement}>
                            -
                        </button>
                        <button className="btn-page-jump-go" onClick={onGo}>
                            Перейти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default JumpMenu;