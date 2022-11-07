import { Router } from "express";

const router = Router();

router.get("/", (req, res)=>{
    const user = {name : req.session.user}
    if(req.session.role === 'admin'){
        res.render('pages/admin-panel', {user});
    }
    else res.render('pages/employee-panel', {user});
});



export default router;