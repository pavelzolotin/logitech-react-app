import ContentLoader from 'react-content-loader';

const Skeleton = () => (
    <ContentLoader
        speed={2}
        width={600}
        height={600}
        viewBox="0 0 600 600"
        backgroundColor="#bdbdbd"
        foregroundColor="#c9c9c9"
    >
        <rect x="110" y="100" rx="5" ry="5" width="400" height="500" />
    </ContentLoader>
);

export default Skeleton;