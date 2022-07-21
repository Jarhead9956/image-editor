import {useState, useRef, useEffect} from 'react';

//Import styles
import styles from './Editor.module.css';

//Import Components
import Button from '../Button';

//Create default image 
const imgAddress = 'https://main.admin.forth.gr/files/site/no-image.png';

const Editor = () => {
    //Set 'ref' to upload input. Use it to trigger click event from button.
    const uploadImageRef = useRef();

    //Set State
    const [imgUrl, setImgUrl] = useState(imgAddress);
    const [filtersInputValue, setFiltersInputValue] = useState(100);
    const [activeBtn, setActiveBtn] = useState('Brightness');
    const [filtersValue, setFiltersValue] = useState({
        brightness: 100,
        saturation: 100,
        inversion: 0,
        grayscale: 0,
        rotate: 0
    });

    //Set which button is active
    const activateBtnHandler = (event) => {
        setActiveBtn(event.target.value);
    };

    //Get value from input and set value to each filter
    const getScaleValueHandler = (event) => {
        setFiltersInputValue(event.target.value);

        if(activeBtn === 'Brightness') {
            setFiltersValue(prevState => {
                let filters = {...prevState};
                filters.brightness = +event.target.value;

                return filters
            })
        }else if(activeBtn === 'Saturation') {
            setFiltersValue(prevState => {
                let filters = {...prevState};
                filters.saturation = +event.target.value;

                return filters
            })
        }else if(activeBtn === 'Inversion') {
            setFiltersValue(prevState => {
                let filters = {...prevState};
                filters.inversion = +event.target.value;

                return filters
            })
        }else if(activeBtn === 'Grayscale') {
            setFiltersValue(prevState => {
                let filters = {...prevState};
                filters.grayscale = +event.target.value;

                return filters
            })
        }
    };

    //Activate left totate button
    const rotateLeftHandler = () => {
        setFiltersValue(prevState => {
            let filters = {...prevState};
            filters.rotate -= 90;

            return filters
        })
    };

    //Activate right rotate button
    const rotateRightHandler = () => {
        setFiltersValue(prevState => {
            let filters = {...prevState};
            filters.rotate += 90;

            return filters
        })
    };

    //Activate image upload input
    const activateImageUploadHandler = () => {
        uploadImageRef.current.click();
    }

    //Execude image upload
    const uploadImageHandler = (event) => {
        const reader = new FileReader;
        reader.onload = () => {
            if(reader.readyState === 2) {
                setImgUrl(reader.result);
            }
        };

        reader.readAsDataURL(event.target.files[0]);
    };


    //Reset all filters
    const resetFiltersHandler = () => {
        setFiltersInputValue(100);
        setActiveBtn('Brightness');
        setFiltersValue({
            brightness: 100,
            saturation: 100,
            inversion: 0,
            grayscale: 0,
            rotate: 0
        });
    };

    //Set correct current value to slider for each filter 
    useEffect(() => {
        if(activeBtn === 'Brightness') {
            setFiltersInputValue(filtersValue.brightness);
        }else if(activeBtn === 'Saturation') {
            setFiltersInputValue(filtersValue.saturation);
        }else if(activeBtn === 'Inversion') {
            setFiltersInputValue(filtersValue.inversion);
        }else if(activeBtn === 'Grayscale') {
            setFiltersInputValue(filtersValue.grayscale);
        }
    }, [activeBtn]);

    //Add styles to image for each filter
    const imgStyles = {
        filter: `
            brightness(${filtersValue.brightness}%) 
            saturate(${filtersValue.saturation}%) 
            invert(${filtersValue.inversion}%) 
            grayscale(${filtersValue.grayscale}%)
        `,
        transform: `rotate(${filtersValue.rotate}deg)`        
    }

    return(
        <div className={styles.wraper}>
            <h2>Easy image editor</h2>
            <div className={styles.main}>
                <div className={styles.filters}>
                    <h3 className={styles['filter-text']}>Filters</h3>
                    <div className={styles.options}>
                        <Button
                            value='Brightness' 
                            onClick={activateBtnHandler}
                            isActive={activeBtn === 'Brightness'}
                        >
                            Brightness
                        </Button>
                        <Button 
                            value='Saturation' 
                            onClick={activateBtnHandler}
                            isActive={activeBtn === 'Saturation'}
                        >
                            Saturation
                        </Button>
                        <Button
                            value='Inversion' 
                            onClick={activateBtnHandler}
                            isActive={activeBtn === 'Inversion'}
                        >
                            Inversion
                        </Button>
                        <Button
                            value='Grayscale'
                            onClick={activateBtnHandler}
                            isActive={activeBtn === 'Grayscale' }
                        >
                            Grayscale
                        </Button>
                    </div>
                    <div className={styles.info}>
                        <h3>{activeBtn}</h3>
                        <p>{`${filtersInputValue}%`}</p>
                    </div>
                    <input type='range' min='0' max='100' value={filtersInputValue} onChange={getScaleValueHandler}/>
                    <h3>Rotate</h3>
                    <div className={styles.rotate}>
                        <Button onClick={rotateLeftHandler}>
                            <i className="fa-solid fa-rotate-left"></i>
                        </Button>
                        <Button onClick={rotateRightHandler}>
                            <i className="fa-solid fa-rotate-right"></i>
                        </Button>
                    </div>
                </div>
                <div className={styles.image}>
                    <img 
                        src={imgUrl} 
                        style={imgStyles}
                    />
                </div>
            </div>
            <div className={styles.actions}>
                <Button 
                    onClick={resetFiltersHandler}
                    styles={styles.reset}
                    >
                    Reset filters
                </Button>
                <div className={styles['image-controls']}>
                    <input type='file' onChange={uploadImageHandler} hidden ref={uploadImageRef}/>
                    <Button
                       onClick={activateImageUploadHandler}
                       styles={styles['choose-btn']} 
                    >
                        Choose image
                    </Button>
                    <Button styles={styles.save}>
                        Save image
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Editor;