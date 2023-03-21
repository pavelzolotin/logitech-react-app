import ContentLoader from 'react-content-loader';

const Skeleton = () => (
    <ContentLoader
        speed={2}
        width={280}
        height={650}
        viewBox="0 0 280 650"
        backgroundColor="#bdbdbd"
        foregroundColor="#c9c9c9"
    >
        <rect x="0" y="0" rx="3" ry="3" width="280" height="390" />
        <rect x="0" y="447" rx="3" ry="3" width="280" height="100" />
        <rect x="0" y="407" rx="3" ry="3" width="280" height="25" />
    </ContentLoader>
);

export default Skeleton;