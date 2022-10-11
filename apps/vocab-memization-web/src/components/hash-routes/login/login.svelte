<script lang="ts">
    import Router,{push} from 'svelte-spa-router'
    import Textfield from '@smui/textfield'
    import Icon from '@smui/textfield/icon';
    import Button from '@smui/button';
    import CircularProgress from '@smui/circular-progress';
    import { SERVICE_API_ENDPOINT } from '../../../configs/common'
    import { convertJsonSchemaErrorsToDestructableObject } from 'common/src/schemas/common'
    import { decodeTokenAndStampIfValid } from '../../../shared/auth/action'

    let username:string = "";
    let password:string = "";
    
    let errorMsg:string|null = null
    let schemasError: Record<string,string> = {}

    let isLoading:boolean = false

    // $: console.log(schemasError)

    async function login(): Promise<void>{
        errorMsg = null // clear the error message
        isLoading = true
        const response = await fetch(`${SERVICE_API_ENDPOINT}/api/auth/login`,{method:'POST',headers: {
                            'Content-Type': 'application/json',},body: JSON.stringify({username,password})})
        if(response.ok){
            const {token} = await response.json()
            const success = decodeTokenAndStampIfValid(token)
            if(success) push('#/home')
            else errorMsg = `Don't tryna make the fake JWT bro`
        }else{
            if(response.status >= 500) errorMsg = 'Internal Server Error (500)'
            else{
                const arbitaryError: any = await response.json()
                if(arbitaryError.message) errorMsg = arbitaryError.message
                else if(arbitaryError.validation_error) schemasError = convertJsonSchemaErrorsToDestructableObject(arbitaryError.validation_error)
            }
        }


        isLoading = false
    }

    function onKeyPressInsidePasswordTextField(e:any): void{
        if (e.charCode === 13) login()
    }
</script>

<main>
    <h1 style="font-size: 16px;margin-bottom: 20px;">Login panel</h1>

    <div class="panel-container">
        <Textfield
            class="shaped-outlined"
            variant="outlined"
            bind:value={username}
            invalid={!username.length}
            label="Username"
            style="height: 50%;"
            required
        >
            <Icon class="material-icons" slot="leadingIcon">person</Icon>
        </Textfield>

        <Textfield
            class="shaped-outlined"
            variant="outlined"
            bind:value={password}
            invalid={!password.length}
            label="Password"
            style="height: 50%;"
            type="password"
            on:keypress={onKeyPressInsidePasswordTextField}
        >
            <Icon class="material-icons" slot="leadingIcon">key</Icon>
        </Textfield>

        <Button disabled={isLoading} on:click={login} variant="raised" style="height: 50%; top: 2px;">
            {#if isLoading}
                <CircularProgress style="height: 32px; width: 32px; color: brown;" indeterminate/>
            {:else}
                LogIn
            {/if}
        </Button>
    </div>
    <p class="error-msg">{errorMsg || ''}</p>
</main>


<style>
    .panel-container{
        height: 80px;
        display: flex;
        align-items: center;
    }
    .error-msg{
        color: red;
        font-family: Roboto;
    }
</style>