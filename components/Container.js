import Head from "next/head";

const Container = (props) => {
    return(
        <div>
            <Head>
                <title>Next.js Project</title>
                <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/flatly/bootstrap.min.css"
                />
            </Head>
            <div className="container p-4">{props.children}</div>
        </div>
    )
    
}

export default Container;