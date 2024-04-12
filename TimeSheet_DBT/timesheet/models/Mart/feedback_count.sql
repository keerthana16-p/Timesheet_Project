{{
    config(
        tags=['mart']
    )
}}
with 
stg_users as (
    select * from  {{ ref('stg_users') }}
),
stg_feedback as (
    select * from {{ ref('stg_feedback')}}
),
filter as (
    select * from stg_users where role!='admin'
),
merge_role as (
    select b.User_Name,a.Role,b.Project_Name,b.Guidance,b.Support from stg_users a 
    right join stg_feedback b on a.First_Name=b.User_Name
    where role != 'Admin'
),
final as (
    select Role,count(User_Name) as Feedback_Count from merge_role group by Role 
)
select * from final

