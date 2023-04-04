import styles from './NotFound.module.scss';

const NotFound = () => {
    return (
        <div className={styles.root}>
            <h1 className={styles.title}>
                Ничего не найдено
            </h1>
            <p className={styles.description}>К сожалению, данная страница отсутствует.</p>
        </div>
    );
};

export default NotFound;