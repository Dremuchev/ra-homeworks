'use strict';

const List = props => {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                return <VideoWithWrap {...item} views={item.views} />;
            case 'article':
                return <ArticleWidthWrap {...item} views={item.views} />;
        }
    });
};

const VideoWithWrap = widthStatus(Video);
const ArticleWidthWrap = widthStatus(Article);

function widthStatus(Component) {
    return class extends React.Component {
        render() {
            if (this.props.views > 999) {
                return (
                    <Popular>
                        <Component  {...this.props} />
                    </Popular>
                );
            } else if (this.props.views < 101) {
                return (
                    <New>
                        <Component  {...this.props} />
                    </New>
                );
            } else {
                return <Component  {...this.props} />
            }
        }
    }
}