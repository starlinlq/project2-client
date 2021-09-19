import { LayoutWrapper } from "./layout.styles";
import { Wrapper } from "../styles/global";
import CategoryList from "../components/categoryList/CategoryList";
import Menu from "../components/menu/Menu";

import { useEffect, useState } from "react";
import agent from "../api/agent";
import Post from "../components/post/Post";
import { SinglePost } from "../store/post/postTypes";

export default function Bookmark() {
  const [state, setState] = useState<
    {
      postId: SinglePost;
      createdBy: { photourl: string; _id: string; username: string };
    }[]
  >([]);

  useEffect(() => {
    const get = async () => {
      const { data } = await agent.post.getBookmarks();
      setState(data);
    };
    get();
  }, []);

  return (
    <LayoutWrapper>
      <Menu />
      <Wrapper width="60%">
        {state.map(({ createdBy, postId }) => (
          <Post
            key={postId._id}
            category={postId.category}
            title={postId.title}
            description={postId.description}
            createdBy={createdBy}
            interestingVotes={postId.interestingVotes}
            commentCount={postId.commentCount}
            _id={postId._id}
            votesCount={postId.votesCount}
            createdAt={postId.createdAt}
            bookmarkIds={postId.bookmarkIds}
          />
        ))}
        {state.length === 0 && (
          <Wrapper
            width="100%"
            style={{
              textAlign: "center",
              boxShadow: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
              backgroundColor: "white",
              height: "266px",
              borderRadius: "10px",
            }}
          >
            <h3 style={{ paddingTop: "10px" }}>You have no bookmarks</h3>
          </Wrapper>
        )}
      </Wrapper>

      <Wrapper width="200px">
        <CategoryList />
      </Wrapper>
    </LayoutWrapper>
  );
}
