import { useDispatch } from "react-redux";
import { reactionAdded } from "../reducers/blogSlice";

const reactionEmoji = {
    thumbsUp: "👍",
    hooray: "🎉",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀",
};

const ReactionButtons = ({ blog }) => {
    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmoji).map(
        ([name, emoji]) => {
            return (
                <button
                    key={name}
                    type="button"
                    onClick={() =>
                        dispatch(
                            reactionAdded({ blogId:blog.id , name })
                        )
                    }
                    className="muted-button reaction-button"
                >
                    {emoji} {blog.reactions[name]}
                </button>
            );
        }
    );

    return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
