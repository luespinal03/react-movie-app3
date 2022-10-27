// Here we are taking the props being passed in ( each blog and their index) and displaying them for the user with the h2 and p tags
const BlogListCard = (props) => {
    console.log("BlogListCard")
    console.log(props);
    return (
        <div className="blog-list-card">
            <h2 className="card-title">{props.blog.title}</h2>
            <p>{props.blog.author}</p>
            <p>{props.blog.text}</p>
        </div>
    )
}

export default BlogListCard;