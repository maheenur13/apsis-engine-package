import type { FC } from "react";

const MastergridTitle: FC<{ title: string }> = ({ title }) => {
    return (
        <div className='mg-title-area'>
            <div className='mg-title'>
                <h6>
                    <span className='fa fa-list mr-2'></span>
                    {title}
                </h6>
            </div>
        </div>
    );
};

export default MastergridTitle;
