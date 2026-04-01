import VideoComp from "./components/VideoComp";
import ContentList from "./components/ContentList";
import CourseSummary from "./components/CourseSummary";
import ModuleSummary from "./components/ModuleSummary";
import api from "../../shared/services/axios";
import { useNavigate, useParams } from "react-router-dom";
import handleError from "../../shared/services/handleError";
import { useEffect, useState } from "react";
import FullScreenLoader from "../../shared/components/FullScreenLoader";
import type { ContentModules } from "./content.types";

export default function Content() {

    const {id} = useParams();
    const [data,setData] = useState<any>(null);
    const [loading,setLoading] = useState(false);
    const [content,setContent] = useState<ContentModules>({
        _id : '',
        contentUrl : "",
        courseId : "",
        duration : 0 ,
        summary : "",
        thumbnailUrl : "",
        title : "",
        next : 0
    });


    const fetchContent = async()=>{
        try{
            const {data:content} = await api.get(`/enrollments/${id}`);
            setData(content.data);
        }catch(error){
            handleError(error);
        }
    }

    const handleComplete = async () => {
        try{
            setLoading(true)
            const {data:updatedEnrollment} = await api.patch(`/enrollments/${id}/mark`,{contentId : content?._id});

            const {data:enrollmentData,success} = updatedEnrollment
            
            if(success){
                setData((pre:any) => ({...pre,enrollment : enrollmentData.enrollment }));                
            }

            if(enrollmentData.completed){
                const contentModules = data.course.contentModules
                const nextContent = contentModules[content.next]
                setContent({
                    ...nextContent,
                    next : contentModules.length ===  content.next+1 ? contentModules.length-1 : content.next+1 })
            }
        }catch(error){
            handleError(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchContent();
    },[id]);

    if(!data)return <FullScreenLoader />

    return (
        <div className="flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-50 font-sans transition-colors duration-300">
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="w-full lg:w-2/3 flex flex-col gap-8">
                        {/* <div className="w-full max-w-7xl">
                            <button
                                onClick={() => navigate('/my-activity')}
                                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
                            >
                                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="font-medium">My Activity</span>
                            </button>
                        </div> */}
                        <section aria-label="Course Video Player">
                            <VideoComp 
                                poster={content?.thumbnailUrl} 
                                title={content?.title} 
                                videoUrl={content?.contentUrl}
                                isCompleted={
                                    content?._id &&
                                    data.enrollment?.completedContent?.includes(content?._id)
                                }
                                handleComplete={handleComplete}
                                loading={loading}
                            />
                        </section>
                        <section aria-label="Module Summary">
                            <ModuleSummary summary={content.summary}/>
                        </section>
                        <section aria-label="Course Overview">
                            <CourseSummary courseDetails={data.course}  />
                        </section>
                    </div>
                    <aside className="w-full lg:w-1/3 lg:sticky lg:top-28">
                        <section aria-label="Course Content Modules">
                            <ContentList
                                content={content}
                                setContent={setContent} 
                                completedModules = {data.enrollment.completedContent} 
                                modules={data.course.contentModules} 
                                courseId={id || ""}
                            />
                        </section>
                    </aside>

                </div>
            </main>
        </div>
    );
}