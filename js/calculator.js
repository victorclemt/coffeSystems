
// Variables Globales
calc_array = new Array();
//var calcul=0;
var pas_ch=0;
var url=window.location.href; 

// Iniciación de la calculadora
function init_calc(id) {
        $id(id+'_result').value=0;
        calc_array[id] = new Array('=',1,'0','0',0);
        document.getElementById(id+'_result').focus();
        return true;
}


function $id(id){
        return document.getElementById(id);
}

// Detectamos el botón que fué presionado para agregarlo al calculo.

function f_calc(id,n)
{
        if(n=='ce')
        {
                init_calc(id);
        }
        else if(n=='=')
        {
                if(calc_array[id][0]!='=' && calc_array[id][1]!=1)
                {

                        //var evaluate=calc_array[id][2]+calc_array[id][0]+calc_array[id][3]+';';
                        var opr1=calc_array[id][2];
                        var opr=calc_array[id][0];
                        var opr2=calc_array[id][3];
                        $.ajax({
                           url: url+'controller/calculator.php',
                           async:false,
                           data: {
                              opr1:opr1,
                              opr:opr,
                              opr2:opr2
                           },
                           error: function() {
                              $('#info').html('<p>Hubo un error en la ejecución</p>');
                           },
                           dataType: 'json',
                           success: function(data) {
                              console.log(data);
                              
                              calcul = data;
                              

                           },
                           type: 'GET'
                        });


                        //eval('calcul='+calc_array[id][2]+calc_array[id][0]+calc_array[id][3]+';');
                        //console.log(calcul);
                        calc_array[id][0] = '=';
                        $id(id+'_result').value=(calcul);
                        calc_array[id][2]=calcul;
                        calc_array[id][3]=0;
                }
        }
        else if(n=='+-')
        {
                $id(id+'_result').value=$id(id+'_result').value*(-1);
                if(calc_array[id][0]=='=')
                {
                        calc_array[id][2] = $id(id+'_result').value;
                        calc_array[id][3] = 0;
                }
                else
                {
                        calc_array[id][3] = $id(id+'_result').value;
                }
                pas_ch = 1;
        }
        else if(n=='nbs')
        {
                if($id(id+'_result').value<10 && $id(id+'_result').value>-10)
                {
                        $id(id+'_result').value=0;
                }
                else
                {
                        $id(id+'_result').value=$id(id+'_result').value.slice(0,$id(id+'_result').value.length-1);
                }
                if(calc_array[id][0]=='=')
                {
                        calc_array[id][2] = $id(id+'_result').value;
                        calc_array[id][3] = 0;
                }
                else
                {
                        calc_array[id][3] = $id(id+'_result').value;
                }
        }
        else
        {
                        if(calc_array[id][0]!='=' && calc_array[id][1]!=1)
                        {
                                var opr1=calc_array[id][2];
                                var opr=calc_array[id][0];
                                var opr2=calc_array[id][3];
                                $.ajax({
                                   url: url+'controller/calculator.php',
                                   async:false,
                                   data: {
                                      opr1:opr1,
                                      opr:opr,
                                      opr2:opr2
                                   },
                                   error: function() {
                                      $('#info').html('<p>Hubo un error en la ejecución</p>');
                                   },
                                   dataType: 'json',
                                   success: function(data) {
                                      console.log(data);
                                      
                                      calcul = data;
                                      

                                   },
                                   type: 'GET'
                                });
                                $id(id+'_result').value=calcul;
                                calc_array[id][2]=calcul;
                                calc_array[id][3]=0;
                        }
                        calc_array[id][0] = n;
        }
        if(pas_ch==0)
        {
                calc_array[id][1] = 1;
        }
        else
        {
                pas_ch=0;
        }
        document.getElementById(id+'_result').focus();
        return true;
}

// Aqui guardamos en el arreglo la inform
function add_calc(id,n)
{
        if(calc_array[id][1]==1)
        {
                $id(id+'_result').value=n;
        }
        else
        {
                $id(id+'_result').value+=n;
        }
        if(calc_array[id][0]=='=')
        {
                calc_array[id][2] = $id(id+'_result').value;
                calc_array[id][3] = 0;
        }
        else
        {
                calc_array[id][3] = $id(id+'_result').value;
        }
        calc_array[id][1] = 0;
        document.getElementById(id+'_result').focus();
        return true;
}


// Verificamoos que tecla fué presionada y se agrega al calculo.
function key_detect_calc(id,evt)
{
        if((evt.keyCode>95) && (evt.keyCode<106))
        {
                var nbr = evt.keyCode-96;
                add_calc(id,nbr);
        }
        else if((evt.keyCode>47) && (evt.keyCode<58))
        {
                var nbr = evt.keyCode-48;
                add_calc(id,nbr);
        }
        else if(evt.keyCode==107)
        {
                f_calc(id,'+');
        }
        else if(evt.keyCode==109)
        {
                f_calc(id,'-');
        }
        else if(evt.keyCode==106)
        {
                f_calc(id,'*');
        }
        else if(evt.keyCode==111)
        {
                f_calc(id,'');
        }
        else if(evt.keyCode==110)
        {
                add_calc(id,'.');
        }
        else if(evt.keyCode==190)
        {
                add_calc(id,'.');
        }
        else if(evt.keyCode==188)
        {
                add_calc(id,'.');
        }
        else if(evt.keyCode==13)
        {
                f_calc(id,'=');
        }
        else if(evt.keyCode==46)
        {
                f_calc(id,'ce');
        }
        else if(evt.keyCode==8)
        {
                f_calc(id,'nbs');
        }
        else if(evt.keyCode==27)
        {
                f_calc(id,'ce');
        }
        return true;
}