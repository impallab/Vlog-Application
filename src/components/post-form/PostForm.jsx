import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from "../index"
import appwriteService from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
k

function PostForm(post) {
    const { register, handleSubmit, watch, setValue, controll, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            status: post?.status || "active",
            content: post?.content || ""
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.user.userData)

    //submit method
    const submit = async (data) => {
        if (post) {
            const newFile = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
            if (newFile) {
                appwriteService.deleteFile(post.featuredImgae)
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImgae: file ? file.$id : undefined

            })
            if (dbPost) {
                navigate(`post/${dbPost.$id}`)
            }
        } else {
            const newFile = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : console.log("file uploadation failed");

            if (newFile) {
                const fileId = newFile.$id
                data.featuredImgae = fileId
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                    if(dbPost) {
                        navigate(`post/${dbPost.$id}`)
                    }
                })
            }
        }
    }

    //slug-tranform method
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, "-")
        return ""
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true
                })
            }
        })
    }, [watch, slugTransform, setValue])



    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm