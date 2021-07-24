import React from 'react'

export default function Image({data}) {
    return (
        <img src={data?.file?.url} />
    )
}
