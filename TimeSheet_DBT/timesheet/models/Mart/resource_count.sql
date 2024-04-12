{{
    config(
        tags=['mart']
    )
}}
with 
stg_resourceallocation as (
    select * from  {{ ref('stg_resourceallocation') }}
),
stg_projects as (
    select MAX(Priority) AS Priority, Project_Name from  {{ ref('stg_projects') }}
    group by Project_Name
),
user_count as (
    select distinct Project_Name,count(User_Name) as User_Count from stg_resourceallocation group by Project_Name having User_Count>10 order by User_Count desc
),
final as (
    select a.Project_Name,b.Priority,a.User_Count from user_count a left join stg_projects b on a.Project_Name=b.Project_Name order by a.User_Count desc
)
select * from final
