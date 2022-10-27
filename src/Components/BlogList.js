import BlogListCard from './BlogListCard'
// <BlogList/> is receiving sampleBlogs(through blogs) as a props(console.log to comfirm)
const BlogList = (props) => {
    console.log("BlogList")
    console.log(props);
    return (
        // below we are mapping through blogs and returning the resulting values into < BlogListCard /> as a props
        <div>
            {
                props.blogs.map((blog, index) => {
                    return (
                        <BlogListCard blog={blog} key={index} />
                    )
                })
            }
        </div>
    )
}

export default BlogList