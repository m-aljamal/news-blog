 
export default function BlogImage({data}) {
    return (
        <img src={data?.file?.url} />
    )
}
