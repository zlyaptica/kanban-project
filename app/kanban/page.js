import { HandleTestData } from "@/components/HandleTestData";
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import testtasks from "@/public/testtasks.json"

export default async function Home() {

    const tasks = await getdata()

    const loadTestData = async () => {
        "use server"
        await dbConnect()
        await Task.insertMany(testtasks)
            .then(function () {
                console.log("Successfully saved defult items to DB");
            })
            .catch(function (err) {
                console.log(err);
            });

    }

    const deleteTestData = async () => {
        "use server"
        await dbConnect()
        await Task.deleteMany()
            .then(function () {
                console.log("Successfully delete tasks from db!");
            })
            .catch(function (err) {
                console.log(err);
            });

    }
    return (
        <>
            <HandleTestData loadTestData={loadTestData} deleteTestData={deleteTestData}/>
            <h1>Board</h1>
            {tasks ? tasks.map(task => (
                <h3 key={task._id}>{task.name} - {task.description}</h3>
            )) : null}
        </>
    );
}

async function getdata() {
    await dbConnect()
    const result = await Task.find({})
    return result
}

